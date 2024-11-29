import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import stylesPages from '../../Styles/StylesPages';
import stylesTextImput from '../../Styles/StylesTextImput';

const RegisterScreen = ({ navigation }) => {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleRegister = async () => {
        const validarEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };
        if (!username) {
            setErrorUsername('O nome de usuário é obrigatório');
            return;
        }
        if (!email) {
            setErrorEmail('O email é obrigatório');
            return;
        }
        if (!validarEmail(email)) {
            setErrorEmail('O email não é válido'); 
            return;
        }
        if (!password) {
            setErrorPassword('A senha é obrigatória');
            return;
        }

        const success = await register(username, email, password);
        if (success) {
            navigation.navigate('Login'); 
        } else {
            Alert.alert('Erro', 'O nome de usuário ou email já estão em uso. Tente outro.'); 
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Criar Conta</Text>
            </View>
            <View style={stylesPages.containerIn2}>
                <TextInput
                    placeholder="Digite seu nome de usuário"
                    value={username}
                    onChangeText={setUsername}
                    style={stylesTextImput.TextImput}
                />
                {errorUsername ? (
                    <Text style={stylesTextImput.textError}>{errorUsername}</Text>
                ) : null}

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
                {errorPassword ? (
                    <Text style={stylesTextImput.textError}>{errorPassword}</Text>
                ) : null}

                <TouchableOpacity onPress={handleRegister} style={stylesPages.button}>
                    <Text>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterScreen;