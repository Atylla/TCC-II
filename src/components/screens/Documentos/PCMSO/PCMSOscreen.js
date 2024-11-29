import React, { useState, useContext } from 'react';
import { Text, TextInput, Button, Alert, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import stylesDetails from '../../../Styles/StylesDetails';
import stylesPages from '../../../Styles/StylesPages';
import stylesTextImput from '../../../Styles/StylesTextImput';

const PCMSOScreen = ({ navigation, route }) => {
    const { companyName, company } = route.params; // Obtendo o nome da empresa da rota
    const { addPCMSO } = useContext(AuthContext);

    // Definindo os estados para os campos do PGR
    const [titulo, setTitulo] = useState('');
    const [riscoFisico, setRiscoFisico] = useState('');
    const [riscoQuimico, setRiscoQuimico] = useState('');
    const [riscoBiologico, setRiscoBiologico] = useState('');
    const [riscoErgonomico, setRiscoErgonomico] = useState('');
    const [exame, setExame] = useState('');
    const [epis, setEpis] = useState('');
    const [treinamento, setTreinamento] = useState('');

    const tipo="PCMSO";
    const cnpj = company.cnpj;
    const fantasia = company.nomeFantasia;
    const handleAddPCMSO = async () => {
        if (titulo.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira o título do PGR.');
            return;
        }

    
        // Chamando a função addPGR com os novos dados
        await addPCMSO(companyName, {
            tipo,
            titulo, 
            riscoFisico, 
            riscoQuimico, 
            riscoBiologico, 
            riscoErgonomico, 
            exame, 
            epis, 
            treinamento,
            cnpj,
            fantasia
        });
    
        // Limpando os campos após o cadastro
        setTitulo('');
        setRiscoFisico('');
        setRiscoQuimico('');
        setRiscoBiologico('');
        setRiscoErgonomico('');
        setExame('');
        setEpis('');
        setTreinamento('');
    
        // Navegando de volta para a tela de detalhes do PGR
        navigation.navigate('GerenciarDocumentos', { companyName });
    };

    return (
        <ScrollView style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Cadastrar Novo PCMSO para {companyName}</Text>
            </View>
            <View style={stylesPages.containerIn2}>
                <Text style={stylesDetails.textConteudo}>Título do PCMSO</Text>
                <TextInput 
                    placeholder="Título do PCMSO" 
                    value={titulo} 
                    onChangeText={setTitulo} 
                    style={stylesTextImput.TextImput} 
                />

                <Text style={stylesDetails.textConteudo}>Planejamento e Execução do PCMSO</Text>
                <Text style={stylesDetails.textConteudo}>Riscos Ocupacionais</Text>
                <TextInput 
                    placeholder="Riscos Físicos" 
                    value={riscoFisico} 
                    onChangeText={setRiscoFisico} 
                    style={stylesTextImput.TextImput} 
                />
                <TextInput 
                    placeholder="Riscos Químicos" 
                    value={riscoQuimico} 
                    onChangeText={setRiscoQuimico} 
                    style={stylesTextImput.TextImput} 
                />
                <TextInput 
                    placeholder="Riscos Biológicos" 
                    value={riscoBiologico} 
                    onChangeText={setRiscoBiologico} 
                    style={stylesTextImput.TextImput} 
                />
                <TextInput 
                    placeholder="Riscos Ergonômicos" 
                    value={riscoErgonomico} 
                    onChangeText={setRiscoErgonomico} 
                    style={stylesTextImput.TextImput} 
                />
                <Text style={stylesDetails.textConteudo}>Exames Médicos Ocupacionais</Text>
                <TextInput 
                    placeholder="Exames" 
                    value={exame} 
                    onChangeText={setExame} 
                    style={stylesTextImput.TextImput} 
                />
                <Text style={stylesDetails.textConteudo}>Epis</Text>
                <TextInput 
                    placeholder="Epis" 
                    value={epis} 
                    onChangeText={setEpis} 
                    style={stylesTextImput.TextImput} 
                />
                <Text style={stylesDetails.textConteudo}>Treinamentos</Text>
                <TextInput 
                    placeholder="Treinamentos" 
                    value={treinamento} 
                    onChangeText={setTreinamento} 
                    style={stylesTextImput.TextImput} 
                />

            
                <TouchableOpacity 
                onPress={() => navigation.navigate('GerenciarDocumentos', { companyName })}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Cancelar Cadastro</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={handleAddPCMSO}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Cadastrar PCMSO</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    }
});

export default PCMSOScreen;
