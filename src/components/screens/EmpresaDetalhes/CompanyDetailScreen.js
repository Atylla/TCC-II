import React, { useContext, useState } from 'react';
import { Button, Text, ScrollView, Alert, View, FlatList, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import stylesPages from '../../Styles/StylesPages';
import stylesDetails from '../../Styles/StylesDetails';
const CompanyDetailScreen = ({ route, navigation }) => {
    const { companyName, company } = route.params || {}; // Garante que route.params não seja undefined
    
    if (!company || !companyName) {
        console.error("company ou companyName não foram passados corretamente.");
        return <Text>Erro: Dados da empresa não encontrados.</Text>; // Exibe uma mensagem de erro se os dados não forem encontrados
    }

    const { deleteCompany, getExcel, user } = useContext(AuthContext);
    const [excelList, setExcelList] = useState([]);

    const fetchExcels = async () => {
        if (user) {
            const excels = await getExcel(companyName);
            console.log("Excel List:", excels); // Verificar os dados retornados
            setExcelList(excels);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchExcels();
        }, [companyName, user, navigation])
    );

    const renderExcelItem = ({ item }) => {
        if (!item || !item.titulo) {
            return <Text>Dados de Excel indisponíveis ou incompletos</Text>;
        }
        console.log(item);
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ExcelDetalhes', { companyName, excelData: item })}
                style={stylesPages.listasFlatList}
            >
                <Text >{item.titulo || 'Título não disponível'}</Text>
                <Text >{item.tipo || 'Tipo não disponível'}</Text>
                <Text >Empresa: {companyName || 'Não especificado'}</Text>
            </TouchableOpacity>
        );
    };

    const handleDeleteCompany = async () => {
        Alert.alert(
            "Confirmação",
            "Tem certeza de que deseja excluir esta empresa?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    style: "destructive",
                    onPress: async () => {
                        await deleteCompany(company.name);
                        navigation.navigate('Company');
                    }
                }
            ]
        );
    };

    return (
        <View style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>{company.name}</Text>
            </View>
               
            <View style={stylesPages.containerIn2}> 
                <ScrollView style={stylesPages.scroll}>
                    <Text style={stylesDetails.textContainer1}>
                        <Text style={stylesDetails.text}>CNPJ: </Text>
                        <Text style={stylesDetails.textConteudo}>{company.cnpj}</Text>
                    </Text>

                    <Text style={stylesDetails.textContainer} >
                    <Text style={stylesDetails.text}>Razão Social: </Text>
                    <Text style={stylesDetails.textConteudo}>{company.razaoSocial}</Text>
                    </Text>

                    <Text style={stylesDetails.textContainer}>
                        <Text style={stylesDetails.text}>Nome Fantasia: </Text>
                        <Text style={stylesDetails.textConteudo}>{company.nomeFantasia}</Text>
                    </Text>

                    <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Ramo de Atividade: </Text>
                    <Text style={stylesDetails.textConteudo}>{company.ramoAtividade}</Text>
                    </Text>

                    <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Endereço: </Text>
                    <Text style={stylesDetails.textConteudo}>{company.endereco}</Text>
                    </Text>

                    <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Telefone: </Text>
                    <Text style={stylesDetails.textConteudo}>{company.telefone}</Text>
                    </Text>

                    <Text style={stylesDetails.textContainer}>
                    <Text style={stylesDetails.text}>Email: </Text>
                    <Text style={stylesDetails.textConteudo}>{company.email}</Text>
                    </Text>
                </ScrollView>

                

                <FlatList
                    style={stylesPages.FlatList}
                    data={excelList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderExcelItem}
                    ListEmptyComponent={<Text>Nenhum Excel cadastrado.</Text>}
                
                />

                <TouchableOpacity 
                onPress={() => navigation.navigate('GerenciarDocumentos', { companyName: company.name, company })}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Gerenciar Documentos e Checklists</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={() => navigation.navigate('Excel', { companyName, company })}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Relatório Excel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={handleDeleteCompany}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Excluir Empresa</Text>
                </TouchableOpacity>
                
            </View>
            
        </View>
    );
};

export default CompanyDetailScreen;