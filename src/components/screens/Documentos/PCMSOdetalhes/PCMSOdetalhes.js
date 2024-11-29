import React, { useContext } from 'react';
import { ScrollView, Text, Button, Alert, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext.js';
import gerarPdfPCMSO from '../../../GerarDocumentos/PDF/GerarPdfPCMSO.js';
import stylesPages from '../../../Styles/StylesPages';
import stylesDetails from '../../../Styles/StylesDetails';

const PCMSODetailScreen = ({ route, navigation }) => {
    const { companyName, pcmsoData } = route.params;
    const { deletePCMSO } = useContext(AuthContext);


    const handleDeletePCMSO = async () => {
        await deletePCMSO(companyName, pcmsoData.titulo);
        Alert.alert("PCMSO excluído com sucesso");
        navigation.goBack();
    };

    const handleGerarPdf = () => {
        gerarPdfPCMSO(companyName, pcmsoData);
    };

    const handleGerarWord = () => {
        GerarWordPCMSO(companyName, pcmsoData); 
    };

    return (
        <ScrollView style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Programa de Controle Médico de Saude Ocupacional (PCMSO)</Text>
            </View>
            <View style={stylesPages.containerIn2}>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Titulo: </Text>
                    <Text style={stylesDetails.textConteudo}>{pcmsoData.titulo}</Text>
                </Text>

                <Text style={stylesDetails.text} >Planejamento e Execução do PCMSO</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Riscos Fisicos: </Text>
                    <Text style={stylesDetails.textConteudo}>{pcmsoData.riscoFisico}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Riscos Químicos: </Text>
                    <Text style={stylesDetails.textConteudo}>{pcmsoData.riscoQuimico}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Riscos Biológicos: </Text>
                    <Text style={stylesDetails.textConteudo}>{pcmsoData.riscoBiologico}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Riscos Ergonomicos: </Text>
                    <Text style={stylesDetails.textConteudo}>{pcmsoData.riscoErgonomico}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Exame: </Text>
                    <Text style={stylesDetails.textConteudo}>{pcmsoData.exame}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>EPIs: </Text>
                    <Text style={stylesDetails.textConteudo}>{pcmsoData.epis}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Treinamento: </Text>
                    <Text style={stylesDetails.textConteudo}>{pcmsoData.treinamento}</Text>
                </Text>
                
                <TouchableOpacity 
                onPress={handleDeletePCMSO}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Excluir PCMSO</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={handleGerarPdf}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Gerar PDF</Text>
                </TouchableOpacity>


                <View style={{marginBottom: '50%'}}></View>

            </View>
        </ScrollView>
    );
};

export default PCMSODetailScreen;

