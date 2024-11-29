import React, { useContext } from 'react';
import { ScrollView, Text, Button, Alert, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import gerarExcel from '../../../GerarDocumentos/Excel';
import stylesDetails from '../../../Styles/StylesDetails';
import stylesPages from '../../../Styles/StylesPages';


const ExcelDetailScreen = ({ route, navigation }) => {
    const { companyName, excelData, company } = route.params;
    const { deleteExcel } = useContext(AuthContext);
    console.log(route.params);

    const handleDeleteExcel = async () => {
        await deleteExcel(companyName, excelData.titulo);
        Alert.alert("OS excluído com sucesso");
        navigation.goBack();
    };

    const handleGerarExcel = () => {
        gerarExcel(companyName, excelData); 
    };
    // Função para gerar o PDF com os dados atuais


    return (
        
            <ScrollView style={stylesPages.container}>
                    <View style={stylesPages.containerIn1}>
                        <Text style={stylesPages.textTitulo}>{excelData.titulo} </Text>
                    </View>
                    <View style={stylesPages.containerIn2}>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>Periodo da inspeção: </Text>
                            <Text style={stylesDetails.textConteudo}>{excelData.periodo}</Text>
                        </Text>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>Empresa: </Text>
                            <Text style={stylesDetails.textConteudo}>{companyName}</Text>
                        </Text>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>CNPJ: </Text>
                            <Text style={stylesDetails.textConteudo}> {excelData.cnpj}</Text>
                        </Text>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>Nome Fantasia: </Text>
                            <Text style={stylesDetails.textConteudo}> {excelData.fantasia}</Text>
                        </Text>





                        <Text style={stylesDetails.text}> Inspeção </Text>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>Data da inspeção: </Text>
                            <Text style={stylesDetails.textConteudo}>{excelData.data}</Text>
                        </Text>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>Setor: </Text>
                            <Text style={stylesDetails.textConteudo}> {excelData.setor}</Text>
                        </Text>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>Condições encontradas: </Text>
                            <Text style={stylesDetails.textConteudo}> {excelData.condicoes}</Text>
                        </Text>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>Riscos Identificados: </Text>
                            <Text style={stylesDetails.textConteudo}> {excelData.riscos}</Text>
                        </Text>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>Ação corretiva: </Text>
                            <Text style={stylesDetails.textConteudo}> {excelData.acoes}</Text>
                        </Text>

                        <Text style={stylesDetails.text}>Treinamento</Text>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>Data: </Text>
                            <Text style={stylesDetails.textConteudo}> {excelData.datatreino}</Text>
                        </Text>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>Tipo de treinamento: </Text>
                            <Text style={stylesDetails.textConteudo}> {excelData.tipotreino}</Text>
                        </Text>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>Equipe: </Text>
                            <Text style={stylesDetails.textConteudo}> {excelData.equipe}</Text>
                        </Text>

                        <Text style={stylesDetails.textContainer}>
                            <Text style={stylesDetails.text}>N. de participantes: </Text>
                            <Text style={stylesDetails.textConteudo}> {excelData.nparticipantes}</Text>
                        </Text>

                        <View style={{marginBottom: '20%'}}></View>
                        <TouchableOpacity 
                        onPress={handleDeleteExcel}
                        style={stylesPages.button}>
                            <Text style={stylesPages.buttonText}>Excluir Excel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={handleGerarExcel}
                        style={stylesPages.button}>
                            <Text style={stylesPages.buttonText}>Gerar Excel</Text>
                        </TouchableOpacity>

                         
                    </View>
                
            
            </ScrollView>
        
    );
};

export default ExcelDetailScreen;