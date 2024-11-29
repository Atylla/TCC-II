import React, { useContext } from 'react';
import { ScrollView, Text, Button, Alert, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import gerarPdfAPR from '../../../GerarDocumentos/PDF/GerarPdfAPR';
import stylesPages from '../../../Styles/StylesPages';
import stylesDetails from '../../../Styles/StylesDetails';

const APRDetailScreen = ({ route, navigation }) => {
    const { companyName, aprData } = route.params;
    const { deleteAPR } = useContext(AuthContext);


    const handleDeleteAPR = async () => {
        await deleteAPR(companyName, aprData.titulo);
        Alert.alert("APR excluído com sucesso");
        navigation.goBack();
    };

    // Função para gerar o PDF com os dados atuais
    const handleGerarPdf = () => {
        gerarPdfAPR(companyName, aprData);
    };

    const handleGerarWord = () => {
        gerarWordAPR(companyName, aprData); 
    };

    return (
        <ScrollView style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Analise Preliminar de Risco (APR) </Text>
            </View>
            <View style={stylesPages.containerIn2}>
                <Text style={stylesDetails.text}>{aprData.titulo}</Text>

                <Text style={stylesDetails.text}>Identificação dos Riscos</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Risco Identificado: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.riscoIdentificado}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Descrição do Risco: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.descricaoRisco}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Consequencias: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.consequencias}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Severidade: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.severidade}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Classificação: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.classificacao}</Text>
                </Text>

                <Text style={stylesDetails.text}>Identificação dos Riscos 2</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Risco Identificado: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.riscoIdentificado2}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Descrição do Risco: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.descricaoRisco2}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Consequencias: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.consequencias2}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Severidade: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.severidade2}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Classificação: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.classificacao2}</Text>
                </Text>

                <Text style={stylesDetails.text}>Equipamentos de Proteção Individual</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Equipamentos: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.equipamentos}</Text>
                </Text> 

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Equipamentos: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.equipamentos2}</Text>
                </Text>

                <Text style={stylesDetails.text}>Condições de Trabalho</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Ambiente de Trabalho: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.ambienteTrabalho}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Sinalização: </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.sinalizacao}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Treinamentos necessários </Text>
                    <Text style={stylesDetails.textConteudo}>{aprData.treinamentos}</Text>
                </Text>

                <TouchableOpacity 
                onPress={handleDeleteAPR}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Excluir APR</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={handleGerarPdf}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Gerar PDF</Text>
                </TouchableOpacity>



                <View style={{marginBottom: '100%'}}></View>

            </View>
        </ScrollView>
    );
};

export default APRDetailScreen;

