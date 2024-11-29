import React, { useState, useContext } from 'react';
import { Text, TextInput, Button, Alert, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import stylesPages from '../../../Styles/StylesPages';
import stylesDetails from '../../../Styles/StylesDetails';
import stylesTextImput from '../../../Styles/StylesTextImput';

const OSscreen = ({ navigation, route }) => {
    const { companyName, company } = route.params; // Obtendo o nome da empresa da rota
    const { addOS } = useContext(AuthContext);

    // Definindo os estados para os campos do PGR
    const [titulo, setTitulo] = useState('');
    const [nomeFuncionario, setNomeFuncionario] = useState('');
    const [funcao, setFuncao] = useState('');
    const [atividade1, setAtividade1] = useState('');
    const [atividade2, setAtividade2] = useState('');
    const [fisico, setFisico] = useState('');
    const [quimico, setQuimico] = useState('');
    const [biologico, setBiologico] = useState('');
    const [ergonomico, setErgonomico] = useState('');
    const [acidentes, setAcidentes] = useState('');
    const [epi1, setEpi1] = useState('');
    const [epi2, setEpi2] = useState('');
    const [epi3, setEpi3] = useState('');
    const [medidas1, setMedidas1] = useState('');
    const [medidas2, setMedidas2] = useState('');
    const [orientacoes, setOrientacoes] = useState('');



    const tipo="OS";
    const cnpj = company.cnpj;
    const fantasia = company.nomeFantasia;
    const handleAddOS = async () => {
        if (titulo.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira o título do APR.');
            return;
        }

    
        // Chamando a função addPGR com os novos dados
        await addOS(companyName, {
            tipo,
            titulo,
            cnpj,
            fantasia,
            nomeFuncionario,
            funcao,
            atividade1,
            atividade2,
            fisico,
            quimico,
            biologico,
            ergonomico,
            acidentes,
            epi1,
            epi2,
            epi3,
            medidas1,
            medidas2,
            orientacoes

        });
    
        // Limpando os campos após o cadastro
        setTitulo('');
        setNomeFuncionario('');
        setFuncao('');
        setAtividade1('');
        setAtividade2('');
        setFisico('');
        setQuimico('');
        setBiologico('');
        setErgonomico('');
        setAcidentes('');
        setEpi1('');
        setEpi2('');
        setEpi3('');
        setMedidas1('');
        setMedidas2('');
        setOrientacoes('');

    
        // Navegando de volta para a tela de detalhes do PGR
        navigation.navigate('GerenciarDocumentos', { companyName });
    };

    return (
        <ScrollView style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Cadastrar Nova OS para {companyName}</Text>
            </View >
            <View style={stylesPages.containerIn2}>
                <Text style={stylesDetails.text}>Ordem de Serviço</Text>
                <TextInput 
                    placeholder="Título do OS" 
                    value={titulo} 
                    onChangeText={setTitulo} 
                    style={stylesTextImput.TextImput} 
                />

                <Text style={stylesDetails.text}>Funcionario</Text>
                <TextInput 
                    placeholder="Nome do Funcionario" 
                    value={nomeFuncionario} 
                    onChangeText={setNomeFuncionario} 
                    style={stylesTextImput.TextImput} 
                />
                <TextInput 
                    placeholder="Função do Funcionario" 
                    value={funcao} 
                    onChangeText={setFuncao} 
                    style={stylesTextImput.TextImput} 
                />  

                <Text style={stylesDetails.text}>Atividades</Text>
                <TextInput 
                    placeholder="Atividade 1" 
                    value={atividade1} 
                    onChangeText={setAtividade1} 
                    style={stylesTextImput.TextImput} 
                />
                <TextInput 
                    placeholder="Atividade 2" 
                    value={atividade2} 
                    onChangeText={setAtividade2} 
                    style={stylesTextImput.TextImput} 
                />

                <Text style={stylesDetails.text}>Riscos e Avaliação</Text>
                <TextInput 
                    placeholder="Fisico" 
                    value={fisico} 
                    onChangeText={setFisico} 
                    style={stylesTextImput.TextImput} 
                />
                <TextInput 
                    placeholder="Quimico" 
                    value={quimico} 
                    onChangeText={setQuimico} 
                    style={stylesTextImput.TextImput} 
                />
                <TextInput 
                    placeholder="Biologico" 
                    value={biologico} 
                    onChangeText={setBiologico} 
                    style={stylesTextImput.TextImput} 
                />
                <TextInput 
                    placeholder="Ergonomico" 
                    value={ergonomico} 
                    onChangeText={setErgonomico} 
                    style={stylesTextImput.TextImput} 
                />
                <TextInput 
                    placeholder="Acidentes" 
                    value={acidentes} 
                    onChangeText={setAcidentes} 
                    style={stylesTextImput.TextImput} 
                />

                <Text style={stylesDetails.text}>EPIs Necessários</Text>
                <TextInput 
                    placeholder="Epi 1" 
                    value={epi1} 
                    onChangeText={setEpi1} 
                    style={stylesTextImput.TextImput} 
                />
                <TextInput 
                    placeholder="Epi 2" 
                    value={epi2} 
                    onChangeText={setEpi2} 
                    style={stylesTextImput.TextImput} 
                />
                <TextInput 
                    placeholder="Epi 3" 
                    value={epi3} 
                    onChangeText={setEpi3} 
                    style={stylesTextImput.TextImput} 
                />

                <Text style={stylesDetails.text}>Medidas preventivas para os Riscos</Text>
                <TextInput 
                    placeholder="Medidas 1" 
                    value={medidas1} 
                    onChangeText={setMedidas1} 
                    style={stylesTextImput.TextImput} 
                />
                <TextInput 
                    placeholder="Medidas 2" 
                    value={medidas2} 
                    onChangeText={setMedidas2} 
                    style={stylesTextImput.TextImput} 
                />

                <Text style={stylesDetails.text}>Orientações</Text>
                <TextInput 
                    placeholder="Orientações" 
                    value={orientacoes} 
                    onChangeText={setOrientacoes} 
                    style={stylesTextImput.TextImput} 
                />

                <TouchableOpacity 
                onPress={() => navigation.navigate('GerenciarDocumentos', { companyName })}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Cancelar Cadastro</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={handleAddOS}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Confirmar Cadastro</Text>
                </TouchableOpacity>

                <View style={{marginBottom: '100%'}}></View>

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

export default OSscreen;