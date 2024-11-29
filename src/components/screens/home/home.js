import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import GerenciarConta from '../GerenciarConta/GerenciarConta';
import stylesPages from '../../Styles/StylesPages';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="HomeMain" 
            component={HomeMain} 
            options={{ headerShown: false }} />
            <Stack.Screen 
            name="GerenciarConta" 
            component={GerenciarConta} 
            options={{ title: 'Voltar' }}
            />
            
        </Stack.Navigator>
    );
};

const HomeMain = ({ navigation }) => {
    const { user } = useContext(AuthContext);


    return (
        <View style={stylesPages.container}>
            {user ? (
                <>
                    <View style={stylesPages.containerIn1}>
                        <Text style={stylesPages.textTitulo}>Bem-vindo, {user.username}!</Text>
                    </View>
                    <View style={stylesPages.containerIn2}> 
                        <TouchableOpacity 
                            style={stylesPages.button}
                            onPress={() => navigation.navigate('Company')}
                            >
                            <Text style={stylesPages.buttonText}>Empresas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('GerenciarConta')}
                            style={stylesPages.button}
                            >
                            <Text style={stylesPages.buttonText}>Gerenciar Conta</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                <Text>Você não está logado.</Text>
                <TouchableOpacity 
                            onPress={() => navigation.navigate('GerenciarConta')}
                            style={stylesPages.button}
                            >
                            <Text style={stylesPages.buttonText}>Gerenciar Conta</Text>
                        </TouchableOpacity>
                </>
            )}  
        </View>
    );
};
export default HomeScreen;