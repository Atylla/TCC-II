import React, { useContext } from 'react';
import { ScrollView, Text, Button, Alert, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import gerarPdfPT from '../../../GerarDocumentos/PDF/GerarPdfPT';
import stylesPages from '../../../Styles/StylesPages';
import stylesDetails from '../../../Styles/StylesDetails';
const PTDetailScreen = ({ route, navigation }) => {
    const { companyName, ptData } = route.params;
    const { deletePT } = useContext(AuthContext);


    const handleDeletePT = async () => {
        await deletePT(companyName, ptData.titulo);
        Alert.alert("PT excluído com sucesso");
        navigation.goBack();
    };

   
    const handleGerarPdf = () => {
        gerarPdfPT(companyName, ptData);
    };

    const handleGerarWord = () => {
        gerarWordPT(companyName, ptData); 
    };

    return (
        <ScrollView style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesDetails.text}>Permissão de Trabalho </Text>
            </View>
            <View style={stylesPages.containerIn2}>
                <Text style={stylesDetails.text}>{ptData.titulo}</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Empresa: </Text>
                    <Text style={stylesDetails.textConteudo}>{companyName}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>CNPJ: </Text>
                    <Text style={stylesDetails.textConteudo}>{ptData.cnpj}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Setor: </Text>
                    <Text style={stylesDetails.textConteudo}>{ptData.setor}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Descrição do Serviço: </Text>
                    <Text style={stylesDetails.textConteudo}>{ptData.descricaoServico}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Data de Inicio</Text>
                    <Text style={stylesDetails.textConteudo}>{ptData.dataInicio}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Data de Fim</Text>
                    <Text style={stylesDetails.textConteudo}>{ptData.dataFim}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Equipe: </Text>
                    <Text style={stylesDetails.textConteudo}>{ptData.equipe}</Text>
                </Text>

                <Text style={stylesDetails.text}>Riscos Identificados e Medidas de Controle</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Risco: </Text>
                    <Text style={stylesDetails.textConteudo}>{ptData.riscos}</Text>
                </Text>
                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Medidas de Controle: </Text>
                    <Text style={stylesDetails.textConteudo}>{ptData.medidas}</Text>
                </Text>

                <Text style={stylesDetails.text}>Equipamentos Necessários</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Equipamentos: </Text>
                    <Text style={stylesDetails.textConteudo}>{ptData.equipamentos}</Text>
                </Text>


                <TouchableOpacity 
                onPress={handleDeletePT}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Excluir Permissão de Trabalho</Text>
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

export default PTDetailScreen;
