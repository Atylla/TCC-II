import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { AuthContext } from '../../context/AuthContext';  // Importando o contexto de autenticação
import stylesDetails from '../../Styles/StylesDetails';
import stylesPages from '../../Styles/StylesPages';

const Arquivos = () => {
  const [downloadedFiles, setDownloadedFiles] = useState([]);
  const { user } = useContext(AuthContext);  // Obtendo o usuário autenticado
  
  // Diretório base para os arquivos de todos os usuários
  const folderUri = FileSystem.documentDirectory + 'sandbox/'; 

  useEffect(() => {
    // Verifica se há um usuário autenticado
    if (user) {
      // Carrega os arquivos do diretório do usuário
      loadDownloadedFiles();
    }
  }, [user]);

  // Função para carregar os arquivos da pasta do usuário
  const loadDownloadedFiles = async () => {
    try {
      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado');
        return;
      }

      // Pasta específica do usuário, baseada no e-mail
      const userFolderUri = folderUri + user.email + '/';

      const folderInfo = await FileSystem.getInfoAsync(userFolderUri);
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(userFolderUri, { intermediates: true });
      }

      // Lê os arquivos do diretório do usuário
      const filesInFolder = await FileSystem.readDirectoryAsync(userFolderUri);
      setDownloadedFiles(filesInFolder);
    } catch (error) {
      console.error('Erro ao listar arquivos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os arquivos.');
    }
  };

  // Função para excluir o arquivo
  const deleteFile = async (filename) => {
    try {
      const userFolderUri = folderUri + user.email + '/';  // Diretório do usuário
      const fileUri = userFolderUri + filename;
      await FileSystem.deleteAsync(fileUri);
      Alert.alert('Sucesso', 'Arquivo excluído com sucesso!');
      loadDownloadedFiles(); // Atualiza a lista de arquivos
    } catch (error) {
      console.error('Erro ao excluir arquivo:', error);
      Alert.alert('Erro', 'Não foi possível excluir o arquivo.');
    }
  };

  // Função para compartilhar o arquivo
  const shareFile = async (filename) => {
    try {
      const userFolderUri = folderUri + user.email + '/';  // Diretório do usuário
      const fileUri = userFolderUri + filename;
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Erro ao compartilhar arquivo:', error);
      Alert.alert('Erro', 'Não foi possível compartilhar o arquivo.');
    }
  };

  // Renderiza cada arquivo com opções para visualizar, excluir e compartilhar
  const renderItem = ({ item }) => (
    <View style={styles.fileItem}>
      <Text style={styles.fileName}>{item}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => Alert.alert('Arquivo', `Você selecionou o arquivo: ${item}`)}>
          <Text style={styles.button}>Visualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteFile(item)}>
          <Text style={styles.button}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareFile(item)}>
          <Text style={styles.button}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={stylesPages.container}>
      <View style={stylesPages.containerIn1}>
        <Text style={stylesPages.textTitulo}>Arquivos baixados:</Text>
      </View>
      <View style={stylesPages.containerIn2}>
        <FlatList
          data={downloadedFiles}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          style={stylesPages.FlatList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fileItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  fileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  button: {
    marginRight: 10,
    color: 'blue',
    fontSize: 16,
  },
});

export default Arquivos;


