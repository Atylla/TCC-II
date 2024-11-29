import React, { useContext } from 'react';
import { ScrollView, Text, Button, Alert, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import gerarPdfOS from '../../../GerarDocumentos/PDF/GerarPdfOS';
import stylesPages from '../../../Styles/StylesPages';
import stylesDetails from '../../../Styles/StylesDetails';

const OSDetailScreen = ({ route, navigation }) => {
    const { companyName, osData } = route.params;
    const { deleteOS } = useContext(AuthContext);


    const handleDeleteOS = async () => {
        await deleteOS(companyName, osData.titulo);
        Alert.alert("OS excluído com sucesso");
        navigation.goBack();
    };

    // Função para gerar o PDF com os dados atuais
    const handleGerarPdf = () => {
        gerarPdfOS(companyName, osData);
    };

    const handleGerarWord = () => {
        gerarWordOS(companyName, osData); 
    };

    return (
        <ScrollView style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Ordem de Serviço </Text>
            </View>
            <View style={stylesPages.containerIn2}>
        
                <Text style={stylesDetails.text}>{osData.titulo}</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Funcionário: </Text>
                    <Text style={stylesDetails.textConteudo}>{osData.nomeFuncionario}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Funcao: </Text>
                    <Text style={stylesDetails.textConteudo}>{osData.funcao}</Text>
                </Text>

                <Text style={stylesDetails.text}>Atividades: </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>{osData.atividade1}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>{osData.atividade2}</Text>
                </Text>

                <Text style={stylesDetails.text}>Risco e Avaliação: </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>Fisico</Text>
                    <Text style={stylesDetails.textConteudo}>{osData.fisico}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>Quimico</Text>
                    <Text style={stylesDetails.textConteudo}>{osData.quimico}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>Biologico</Text>
                    <Text style={stylesDetails.textConteudo}>{osData.biologico}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>Ergonomico</Text>
                    <Text style={stylesDetails.textConteudo}>{osData.ergonomico}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>Acidentes</Text>   
                    <Text style={stylesDetails.textConteudo}>{osData.acidentes}</Text>
                </Text>

                <Text style={stylesDetails.text}>EPIs: </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>{osData.epi1}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>{osData.epi2}</Text>
                </Text> 

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>{osData.epi3}</Text>
                </Text>

                <Text style={stylesDetails.text}>Medidas Preventivas</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>{osData.medidas1}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>{osData.medidas2}</Text>
                </Text>

                <Text style={stylesDetails.text}>Orientações de Segurança do Trabalho</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.textConteudo}>{osData.orientacoes}</Text>
                </Text>

                <TouchableOpacity 
                onPress={handleDeleteOS}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Excluir Ordem de Serviço</Text>
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

export default OSDetailScreen;