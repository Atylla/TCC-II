import React, { useState, useContext } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native'; // Importando useFocusEffect
import stylesPages from '../../Styles/StylesPages';
import stylesTextImput from '../../Styles/StylesTextImput';

const CompanyScreen = ({ navigation }) => {
    const { getCompanies } = useContext(AuthContext);
    const [companies, setCompanies] = useState([]);

    // Função para buscar empresas
    const fetchCompanies = async () => {
        const userCompanies = await getCompanies();
        setCompanies(userCompanies);
    };

    // Usando useFocusEffect para atualizar a lista de empresas quando a tela entra em foco
    useFocusEffect(
        React.useCallback(() => {
            fetchCompanies(); // Chama a função para buscar empresas
        }, [])
    );

    return (
        <View style={stylesPages.container}>
            
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Empresas</Text>
            </View>

            <View style={stylesPages.containerIn2}>
                <TouchableOpacity 
                    onPress={() => { navigation.navigate('CreateCompany'); }} 
                    style={stylesPages.button}
                    >
                    <Text>Nova Empresa</Text>
                </TouchableOpacity>
                <FlatList
                    
                    data={companies}
                    keyExtractor={(item, index) => index.toString()} // Usando o índice como chave
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                        style={stylesPages.listasFlatList}
                        onPress={() => navigation.navigate('CompanyDetail', { 
                            company: item, 
                            companyName: item.name,
                             })}>
                            <View >
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    style={stylesPages.FlatList}
                />
            </View>
        </View>
    );
};

export default CompanyScreen;