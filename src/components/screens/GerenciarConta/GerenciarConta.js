import React, { useContext } from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import stylesPages from '../../Styles/StylesPages';

const GerenciarConta = ({ navigation }) => {
    const { logout, deleteUserAccount, user } = useContext(AuthContext);

    const handleDeleteAccount = async () => {
        if (!user) {
            Alert.alert("Erro", "Usuário não está autenticado.");
            return;
        }
        
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza de que deseja excluir sua conta? Essa ação não pode ser desfeita.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        await deleteUserAccount(user.email);
                        navigation.navigate('Welcome');
                    },
                },
            ]
        );
    };

    return (
        <View style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Gerenciar Conta</Text>
            </View>
            <View style={stylesPages.containerIn2}>

                <TouchableOpacity
                onPress={() => { logout(); navigation.navigate('Welcome'); }}
                style={stylesPages.button}
                >
                    <Text style={stylesPages.buttonText}>Sair</Text>
                </TouchableOpacity> 
                
                <TouchableOpacity
                onPress={handleDeleteAccount}
                style={stylesPages.button}
                >
                    <Text style={stylesPages.buttonText}>Excluir Conta</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
};

export default GerenciarConta;