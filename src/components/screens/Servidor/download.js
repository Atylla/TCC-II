import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { AuthContext } from '../../context/AuthContext';  // Importando o contexto de autenticação
import stylesPages from '../../Styles/StylesPages';
import stylesDetails from '../../Styles/StylesDetails';

const Download = () => {
  const [files, setFiles] = useState([]);
  const { user } = useContext(AuthContext);  // Obtendo o usuário autenticado
  const folderUri = FileSystem.documentDirectory + 'sandbox/';  // Diretório base para todos os usuários

  useEffect(() => {
    // Verificando se há um usuário autenticado
    if (user) {
      // Obtendo a lista de arquivos do servidor
      fetch('http://192.168.48.110:3000/files')
        .then((response) => response.json())
        .then((data) => setFiles(data))
        .catch((error) => console.error('Erro ao buscar arquivos:', error));
    }
  }, [user]);

  const downloadFile = (filename) => {
    // Exibe o alerta de confirmação para o download
    Alert.alert(
      'Confirmar Download',
      `Você realmente deseja baixar o arquivo ${filename}?`,
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Download cancelado'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => initiateDownload(filename), // Chama a função de download
        },
      ]
    );
  };

  const initiateDownload = async (filename) => {
    try {
      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado');
        return;
      }

      const userFolderUri = folderUri + user.email + '/';  // Pasta exclusiva para o usuário, com o e-mail

      // Certifique-se de que a pasta do usuário existe
      const folderInfo = await FileSystem.getInfoAsync(userFolderUri);
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(userFolderUri, { intermediates: true });
      }

      // Caminho completo onde o arquivo será salvo
      const fileUri = userFolderUri + filename;

      // Baixando o arquivo do servidor
      const response = await fetch(`http://192.168.48.110:3000/download/${filename}`);
      const blob = await response.blob();

      if (!response.ok) {
        throw new Error('Erro ao baixar o arquivo');
      }

      // Convertendo o blob para base64 e salvando com writeAsStringAsync
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1]; // Remove o prefixo "data:..." da string Base64

        // Salva o arquivo no diretório específico do usuário
        await FileSystem.writeAsStringAsync(fileUri, base64data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        Alert.alert('Sucesso', 'Arquivo baixado com sucesso!');
      };
      reader.readAsDataURL(blob);  // Converte o blob para Base64

    } catch (error) {
      console.error('Erro ao baixar arquivo', error);
      Alert.alert('Erro', 'Falha ao baixar arquivo.');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => downloadFile(item)}
      style={stylesPages.FlatList}>
      <Text style={stylesPages.button}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={stylesPages.container}>
      <View style={stylesPages.containerIn1}>
        <Text style={stylesPages.textTitulo}>Arquivos disponíveis para download:</Text>
      </View>
      <View style={stylesPages.containerIn2}>
        <FlatList
          data={files}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          style={stylesPages.FlatList}
        />
      </View>    
    </View>
  );
};

export default Download;







