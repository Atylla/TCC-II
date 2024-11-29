import React, { useState } from 'react';
import { Button, View, Alert, Text, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import stylesDetails from '../../Styles/StylesDetails';
import stylesPages from '../../Styles/StylesPages';

const Servidor = ({ navigation }) => {
  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileType, setFileType] = useState(null);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    console.log(result);  // Verifique o que está sendo retornado no console

    // Se 'assets' e 'uri' estão presentes, o arquivo foi selecionado com sucesso
    const file = result.assets?.[0];  // Pegando o primeiro item se existir
    if (file && file.uri) {
      setFileUri(file.uri);  // Atualiza o estado com o URI do arquivo
      setFileName(file.name); // Armazena o nome do arquivo
      setFileType(file.mimeType || 'application/octet-stream'); // Armazena o tipo MIME, ou usa o tipo genérico
      console.log('Arquivo selecionado:', file.name);
      console.log('MIME Ddo Arquivo selecionado:', file.mimeType);
    } else {
      // Se não houver arquivo selecionado, limpa o URI
      setFileUri(null);
      setFileName(null);
      setFileType(null);
      console.log('Documento não selecionado ou cancelado');
    }
  };

  const uploadFile = async () => {
    if (!fileUri) {
      Alert.alert('Erro', 'Nenhum arquivo selecionado.');
      return;
    }
  
    let fileName = 'defaultFileName';  // Nome padrão, pode ser alterado conforme o tipo
    let fileType = 'application/octet-stream';  // Tipo MIME padrão
  
    // Verifique o tipo do arquivo e ajuste o nome e tipo MIME conforme necessário
    if (fileUri.endsWith('.pdf')) {
      fileName = 'fileName.pdf';  // Nome correto para PDF
      fileType = 'application/pdf';  // Tipo MIME para PDF
    } else if (fileUri.endsWith('.jpg') || fileUri.endsWith('.jpeg')) {
      fileName = 'fileName.jpg';  // Nome correto para JPG
      fileType = 'image/jpeg';  // Tipo MIME para JPG
    } else if (fileUri.endsWith('.png')) {
      fileName = 'fileName.png';  // Nome correto para PNG
      fileType = 'image/png';  // Tipo MIME para PNG
    } else if (fileUri.endsWith('.docx')) {
      fileName = 'fileName.docx';  // Nome correto para DOCX
      fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';  // Tipo MIME para DOCX
    } else if (fileUri.endsWith('.mp4')) {
      fileName = 'fileName.mp4';  // Nome correto para MP4
      fileType = 'video/mp4';  // Tipo MIME para MP4
    } else if (fileUri.endsWith('.doc')) {
      fileName = 'fileName.doc';  // Nome correto para DOC
      fileType = 'application/msword';  // Tipo MIME para DOC
    } else if (fileUri.endsWith('.xlsx')) {
      fileName = 'fileName.xlsx';  // Nome correto para XLSX
      fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';  // Tipo MIME para XLSX
    } else if (fileUri.endsWith('.xls')) {
      fileName = 'fileName.xls';  // Nome correto para XLS
      fileType = 'application/vnd.ms-excel';  // Tipo MIME para XLS
    }
  
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: fileName,  // Use o nome real do arquivo, se necessário
      type: fileType,  // Certifique-se de passar o MIME correto para o arquivo
    });
  
    try {
      const response = await fetch('http://192.168.48.110:3000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        console.error('Erro no servidor:', response.statusText);
        throw new Error('Falha no upload');
      }
  
      const responseJson = await response.json();
      Alert.alert('Sucesso', responseJson.message);
    } catch (error) {
      console.error('Erro ao fazer upload', error);
      Alert.alert('Erro', 'Falha ao enviar arquivo.');
    }
  };
  
  

  return (
    <View style={stylesPages.container}>
      <View style={stylesPages.containerIn1}>
          <Text style={stylesPages.textTitulo}>Upload de Arquivos</Text>
      </View>
      <View style={stylesPages.containerIn2}>

        <TouchableOpacity 
        onPress={pickDocument}
        style={stylesPages.button}
        >
          <Text style={stylesPages.buttonText}>Escolher Documento</Text>
        </TouchableOpacity>

        {fileUri && <Text style={stylesDetails.text}>Arquivo selecionado: {fileName}</Text>}

        <TouchableOpacity 
        onPress={uploadFile}
        style={stylesPages.button}
        >
          <Text style={stylesPages.buttonText}>Fazer Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => navigation.navigate('Download')}
        style={stylesPages.button}
        >
          <Text style={stylesPages.buttonText}>Fazer Download</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => navigation.navigate('Arquivos')}
        style={stylesPages.button}
        >
          <Text style={stylesPages.buttonText}>Arquivos Baixados</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

export default Servidor;