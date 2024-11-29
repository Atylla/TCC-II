import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import stylesTextImput from '../../Styles/StylesTextImput';
import stylesPages from '../../Styles/StylesPages';
import { useFocusEffect } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorSenha, setErrorSenha] = useState('');
    const [errorCriarConta, setErrorCriarConta] = useState('');

    const handleLogin = async () => {
        const success = await login(email, password);
        if (success) {
            setErrorEmail('');
            setErrorSenha('');
            setErrorCriarConta('');
            navigation.navigate('Rotas'); 
        } else {
            setErrorEmail('Email ou senha incorretos');
            setErrorSenha('Senha incorretos');
            setErrorCriarConta('Crie uma conta');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setErrorEmail('');
            setErrorSenha('');
            setErrorCriarConta('');
        }, [])
    );

    return (
        <View style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Login</Text>
            </View>
            <View style={stylesPages.containerIn2}>
                <TextInput
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                    style={stylesTextImput.TextImput}
                />
                {errorEmail ? (
                    <Text style={stylesTextImput.textError}>{errorEmail}</Text>
                ) : null}
                <TextInput
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={stylesTextImput.TextImput}
                />
                {errorSenha ? (
                    <Text style={stylesTextImput.textError}>{errorSenha}</Text>
                ) : null}

                <TouchableOpacity onPress={handleLogin} style={stylesPages.button}>
                    <Text>Entrar</Text>
                </TouchableOpacity>

                {errorCriarConta ? (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Register')}
                        style={{ width: '80%' }}
                    >
                        <Text style={stylesTextImput.textErrorConta}>{errorCriarConta}</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
};

export default LoginScreen;