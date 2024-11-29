import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import stylesPages from '../../../Styles/StylesPages';
import stylesDetails from '../../../Styles/StylesDetails';
import stylesTextImput from '../../../Styles/StylesTextImput';

const PGRscreen = ({ navigation, route }) => {
    const { companyName, company } = route.params; // Obtendo o nome da empresa da rota
    const { addPGR } = useContext(AuthContext);

    // Definindo os estados para os campos do PGR
    const [titulo, setTitulo] = useState('');
    const [cnae, setCNAE] = useState('');
    const [atividade, setAtividade] = useState('');
    const [riscos, setRiscos] = useState('');
    const [descricaoRisco, setDescricaoRisco] = useState('');
    const [categoria, setCategoria] = useState('');
    const [metodoAvaliacao, setMetodoAvaliacao] = useState('');
    const [probabilidade, setProbabilidade] = useState('');
    const [consequencias, setConsequencias] = useState('');
    const [risco, setRisco] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const tipo="PGR";

    const cnpj = company.cnpj;
    const fantasia = company.nomeFantasia;
    const handleAddPGR = async () => {
        if (titulo.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira o título do PGR.');
            return;
        }

    
        // Chamando a função addPGR com os novos dados
        await addPGR(companyName, {
            tipo,
            titulo, 
            cnae, 
            atividade, 
            riscos, 
            descricaoRisco, 
            categoria, 
            metodoAvaliacao, 
            probabilidade, 
            consequencias, 
            risco, 
            prioridade,
            cnpj,
            fantasia
        });
    
        // Limpando os campos após o cadastro
        setTitulo('');
        setCNAE('');
        setAtividade('');
        setRiscos('');
        setDescricaoRisco('');
        setCategoria('');
        setMetodoAvaliacao('');
        setProbabilidade('');
        setConsequencias('');
        setRisco('');
        setPrioridade('');
    
        // Navegando de volta para a tela de detalhes do PGR
        navigation.navigate('GerenciarDocumentos', { companyName });
    };

    return (
        <ScrollView style={stylesPages.container}>
        <View style={stylesPages.containerIn1}>
            <Text style={stylesPages.textTitulo}>Cadastrar Novo PGR para {companyName}</Text>
        </View>   
        <View style={stylesPages.containerIn2}> 
            <TextInput 
                placeholder="Título do PGR" 
                value={titulo} 
                onChangeText={setTitulo} 
                style={stylesTextImput.TextImput} 
            />

        <Text style={stylesDetails.textConteudo}>Atividade e Operaçoes da Empresa</Text>
            <TextInput 
                placeholder="CNAE" 
                value={cnae} 
                onChangeText={setCNAE} 
                style={stylesTextImput.TextImput} 
            />

            <Text style={stylesDetails.textConteudo}>Riscos Identificados</Text>
            <TextInput 
                placeholder="Atividade" 
                value={atividade} 
                onChangeText={setAtividade} 
                style={stylesTextImput.TextImput} 
            />
            <TextInput 
                placeholder="Riscos" 
                value={riscos} 
                onChangeText={setRiscos} 
                style={stylesTextImput.TextImput} 
            />
            <TextInput 
                placeholder="Descricão do Risco" 
                value={descricaoRisco} 
                onChangeText={setDescricaoRisco} 
                style={stylesTextImput.TextImput} 
            /> 
            <TextInput 
                placeholder="Categoría do Risco" 
                value={categoria} 
                onChangeText={setCategoria} 
                style={stylesTextImput.TextImput} 
            />  

            <Text style={stylesDetails.textConteudo}>Metodo de Avaliação do Risco</Text>
            <TextInput 
                placeholder="Metodo de Avaliação" 
                value={metodoAvaliacao} 
                onChangeText={setMetodoAvaliacao} 
                style={stylesTextImput.TextImput} 
            />

            <Text style={stylesDetails.textConteudo}>Matriz de riscos</Text>  
            <TextInput 
                placeholder="Probabilidade" 
                value={probabilidade} 
                onChangeText={setProbabilidade} 
                style={stylesTextImput.TextImput} 
            />  
            <TextInput 
                placeholder="Consequências" 
                value={consequencias} 
                onChangeText={setConsequencias} 
                style={stylesTextImput.TextImput} 
            />  
            <TextInput 
                placeholder="Risco" 
                value={risco} 
                onChangeText={setRisco} 
                style={stylesTextImput.TextImput} 
            />  
            <TextInput  
                placeholder="Prioridade" 
                value={prioridade} 
                onChangeText={setPrioridade} 
                style={stylesTextImput.TextImput} 
            />

            <TouchableOpacity 
            onPress={() => navigation.navigate('GerenciarDocumentos', { companyName })}
            style={stylesPages.button}>
                <Text style={stylesPages.buttonText}>Cancelar Cadastro</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            onPress={handleAddPGR}
            style={stylesPages.button}>
                <Text style={stylesPages.buttonText}>Confirmar Cadastro</Text>
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

export default PGRscreen;
