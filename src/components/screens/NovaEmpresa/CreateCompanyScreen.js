import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import stylesPages from '../../Styles/StylesPages';
import stylesTextImput from '../../Styles/StylesTextImput';


const CreateCompanyScreen = ({ navigation }) => {
    const { addCompany } = useContext(AuthContext);
    
    // Estados para cada campo
    const [companyName, setCompanyName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [ramoAtividade, setRamoAtividade] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [responsavelNome, setResponsavelNome] = useState('');
    const [responsavelTelefone, setResponsavelTelefone] = useState('');
    const [responsavelEmail, setResponsavelEmail] = useState('');

    const handleAddCompany = async () => {
        if (companyName.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira o nome da empresa.');
            return;
        }
        
        // Chamando a função addCompany com os novos dados
        await addCompany({
            name: companyName,
            cnpj,
            razaoSocial,
            nomeFantasia,
            ramoAtividade,
            endereco,
            telefone,
            email,
            responsavel: {
                nome: responsavelNome,
                telefone: responsavelTelefone,
                email: responsavelEmail
            }
        });

        // Limpando campos após cadastro
        setCompanyName('');
        setCnpj('');
        setRazaoSocial('');
        setNomeFantasia('');
        setRamoAtividade('');
        setEndereco('');
        setTelefone('');
        setEmail('');
        setResponsavelNome('');
        setResponsavelTelefone('');
        setResponsavelEmail('');

        navigation.navigate('Company'); // Navega de volta para a tela de empresas
    };

    return (
        <ScrollView style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Cadastrar Nova Empresa</Text>
            </View>
            <View style={stylesPages.containerIn2}>
                <TextInput placeholder="Nome da Empresa" value={companyName} onChangeText={setCompanyName} style={stylesTextImput.TextImput} />
                <TextInput placeholder="CNPJ" value={cnpj} onChangeText={setCnpj} style={stylesTextImput.TextImput} />
                <TextInput placeholder="Razão Social" value={razaoSocial} onChangeText={setRazaoSocial} style={stylesTextImput.TextImput} />
                <TextInput placeholder="Nome Fantasia" value={nomeFantasia} onChangeText={setNomeFantasia} style={stylesTextImput.TextImput} />
                <TextInput placeholder="Ramo de Atividade" value={ramoAtividade} onChangeText={setRamoAtividade} style={stylesTextImput.TextImput} />
                <TextInput placeholder="Endereço Completo" value={endereco} onChangeText={setEndereco} style={stylesTextImput.TextImput} />
                <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} style={stylesTextImput.TextImput} />
                <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={stylesTextImput.TextImput} />
                
                <TouchableOpacity onPress={handleAddCompany} style={stylesPages.button}>
                    <Text>Confirmar Empresa</Text>
                </TouchableOpacity>

                <View style={{marginBottom: '100%'}}></View>
                 
            </View>   
        </ScrollView>
    );
};

export default CreateCompanyScreen;