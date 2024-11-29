import React from 'react';
import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import stylesPages from '../../Styles/StylesPages';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Bem-vindo ao Gestão Base</Text>
            </View>
            <View style={stylesPages.containerIn2}>
                <Text style={stylesPages.text}>Entre para fazer Login</Text>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Login')}
                    style={stylesPages.button}
                    >
                    <Text style={stylesPages.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Register')}
                    style={stylesPages.button}
                    >
                    <Text style={stylesPages.buttonText}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default WelcomeScreen;