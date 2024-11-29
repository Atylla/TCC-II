import React, { useContext } from 'react';
import { ScrollView, Text, Button, Alert, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import gerarPdfLTCAT from '../../../GerarDocumentos/PDF/GerarPdfLTCAT';
import stylesPages from '../../../Styles/StylesPages';
import stylesDetails from '../../../Styles/StylesDetails';
import stylesTextImput from '../../../Styles/StylesTextImput';
const LTCATDetailScreen = ({ route, navigation }) => {
    const { companyName, ltcatData } = route.params;
    const { deleteLTCAT } = useContext(AuthContext);


    const handleDeleteLTCAT = async () => {
        await deleteLTCAT(companyName, ltcatData.titulo);
        Alert.alert("LTCAT excluído com sucesso");
        navigation.goBack();
    };

    // Função para gerar o PDF com os dados atuais
    const handleGerarPdf = () => {
        gerarPdfLTCAT(companyName, ltcatData);
    };

    const handleGerarWord = () => {
        gerarWordLTCAT(companyName, ltcatData); 
    };
    

    return (
        <ScrollView style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Laudo Técnico das Condições Ambientais de Trabalho (LTCAT) </Text>
            </View>
            <View style={stylesPages.containerIn2}>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Titulo: </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.titulo}</Text>
                </Text>

                
                <Text style={stylesDetails.text}>Dados do Ambiente de Trabalho</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Setor: </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.setor}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Função: </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.funcao}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Descrição da Atividade: </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.descricaoAtividade}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Equipamentos Utilizados: </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.equipamento}</Text>
                </Text>
                

                <Text style={stylesDetails.text}>Anáse das Condições Ambientais</Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Agente Nocivo </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.agenteNocivo}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Intensidade </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.intensidade}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Classe de Risco </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.classeRisco}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>EPI Usado </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.classeRisco}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Observações </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.observacoes}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Agente Nocivo </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.agenteNocivo1}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Intensidade </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.intensidade1}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Classe de Risco </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.classeRisco1}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>EPI Usado </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.classeRisco1}</Text>
                </Text>

                <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Observações </Text>
                    <Text style={stylesDetails.textConteudo}>{ltcatData.observacoes1}</Text>
                </Text>

                <TouchableOpacity 
                onPress={handleDeleteLTCAT}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Excluir LTCAT</Text>
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

export default LTCATDetailScreen;

