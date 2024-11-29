import React, { useContext } from 'react';
import { ScrollView, Text, Button, Alert, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import gerarPdfPGR from '../../../GerarDocumentos/PDF/GerarPdfPGR';
import stylesPages from '../../../Styles/StylesPages';
import stylesDetails from '../../../Styles/StylesDetails';

const PGRDetailScreen = ({ route, navigation }) => {
    const { companyName, pgrData } = route.params;
    const { deletePGR } = useContext(AuthContext);

  
    const handleDeletePGR = async () => {
        await deletePGR(companyName, pgrData.titulo);
        Alert.alert("PGR excluído com sucesso");
        navigation.goBack();
    };

    
    const handleGerarPdf = () => {
        gerarPdfPGR(companyName, pgrData);
    };

    const handleGerarWord = () => {
        GerarWordPGR(companyName, pgrData); 
    };

    return (
        <ScrollView style={stylesPages.container}>
        <View style={stylesPages.containerIn1}>
            <Text style={stylesPages.textTitulo}>Programa de Gerenciamento de Riscos (PGR)</Text>
        </View>
        <View style={stylesPages.containerIn2}>

            <Text style={stylesDetails.textContainer}>
                <Text style={stylesDetails.text}>Titulo: </Text>
                <Text style={stylesDetails.textConteudo}>{pgrData.titulo}</Text>
            </Text>

            <Text style={stylesDetails.text}>Atividades e operações da Empresa (CNAE):</Text>
            
            <Text style={stylesDetails.textContainer}>
                <Text style={stylesDetails.text}>CNAE: </Text>
                <Text style={stylesDetails.textConteudo}>{pgrData.cnae}</Text>
            </Text>

            
            <Text style={stylesDetails.text}>Riscos Identificados: </Text>
                
            <Text style={stylesDetails.textContainer}>
                <Text style={stylesDetails.text}>Atividade: </Text>
                <Text style={stylesDetails.textConteudo}>{pgrData.atividade}</Text>
            </Text>

            <Text style={stylesDetails.textContainer}>
                <Text style={stylesDetails.text}>Riscos: </Text>
                <Text style={stylesDetails.textConteudo}>{pgrData.riscos}</Text>
            </Text>

            <Text style={stylesDetails.textContainer}>
                <Text style={stylesDetails.text}>Descrição do Risco: </Text>
                <Text style={stylesDetails.textConteudo}>{pgrData.descricaoRisco}</Text>
            </Text>

            <Text style={stylesDetails.textContainer}>
                <Text style={stylesDetails.text}>Categoria: </Text>
                <Text style={stylesDetails.textConteudo}>{pgrData.categoria}</Text>
            </Text>

            

            <Text style={stylesDetails.text}> Metodo de Avaliação:</Text>
            <Text style={stylesDetails.textContainer}>
                <Text style={stylesDetails.textConteudo}>{pgrData.metodoAvaliacao}</Text>
            </Text>

            <Text style={stylesDetails.text}>Matriz de Riscos:</Text>

            <Text style={stylesDetails.textContainer}>
                <Text style={stylesDetails.text}>Probabilidade: </Text>
                <Text style={stylesDetails.textConteudo}>{pgrData.probabilidade}</Text>
            </Text>

            <Text style={stylesDetails.textContainer}>
                <Text style={stylesDetails.text}>Consequências: </Text>
                <Text style={stylesDetails.textConteudo}>{pgrData.consequencias}</Text>
            </Text>

            <Text style={stylesDetails.textContainer}>
                <Text style={stylesDetails.text}>Risco: </Text>
                <Text style={stylesDetails.textConteudo}>{pgrData.risco}</Text>
            </Text>

            <Text style={stylesDetails.textContainer}>
                <Text style={stylesDetails.text}>Prioridade: </Text>
                <Text style={stylesDetails.textConteudo}>{pgrData.prioridade}</Text>
            </Text>
            
            <TouchableOpacity 
            onPress={handleDeletePGR}
            style={stylesPages.button}>
                <Text style={stylesPages.buttonText}>Excluir PGR</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={handleGerarPdf}
            style={stylesPages.button}>
                <Text style={stylesPages.buttonText}>Gerar PDF</Text>
            </TouchableOpacity>

        </View>
        </ScrollView>
    );
};

export default PGRDetailScreen;

