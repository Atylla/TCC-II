import React, { useState, useContext } from 'react';
import { Text, TextInput, Button, Alert, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import stylesPages from '../../../Styles/StylesPages';
import stylesDetails from '../../../Styles/StylesDetails';
import stylesTextImput from '../../../Styles/StylesTextImput';

const LTCATScreen = ({ navigation, route }) => {
    const { companyName, company } = route.params; // Obtendo o nome da empresa da rota
    const { addLTCAT } = useContext(AuthContext);

    // Definindo os estados para os campos do PGR
    const [titulo, setTitulo] = useState('');
    const [setor, setSetor] = useState('');
    const [descricaoAtividade, setDescricaoAtividade] = useState('');
    const [equipamento, setEquipamento] = useState('');
    const [agenteNocivo, setAgenteNocivo] = useState('');
    const [intensidade, setIntensidade] = useState('');
    const [classeRisco, setClasseRisco] = useState('');
    const [epiUsado, setEpiUsado] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [data, setData] = useState('');

    const [agenteNocivo1, setAgenteNocivo1] = useState('');
    const [intensidade1, setIntensidade1] = useState('');
    const [classeRisco1, setClasseRisco1] = useState('');
    const [epiUsado1, setEpiUsado1] = useState('');
    const [observacoes1, setObservacoes1] = useState('');

    const tipo="LTCAT";
    const cnpj = company.cnpj;
    const fantasia = company.nomeFantasia;
    const ramoAtividade = company.ramoAtividade;

    const handleAddLTCAT = async () => {
        if (titulo.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira o título do LTCAT.');
            return;
        }

    
        // Chamando a função addPGR com os novos dados
        await addLTCAT(companyName, {
            tipo,
            titulo,
            setor,
            descricaoAtividade,
            equipamento,
            agenteNocivo,
            intensidade,
            classeRisco,
            epiUsado,
            observacoes,
            cnpj,
            fantasia,
            ramoAtividade,
            data,
            agenteNocivo1,
            intensidade1,
            classeRisco1,
            epiUsado1,
            observacoes1
        });
    
        // Limpando os campos após o cadastro
        setTitulo('');
        setSetor('');
        setDescricaoAtividade('');
        setEquipamento('');
        setAgenteNocivo('');
        setIntensidade('');
        setClasseRisco('');
        setEpiUsado('');
        setObservacoes('');
        setData('');
        setAgenteNocivo1('');
        setIntensidade1('');
        setClasseRisco1('');
        setEpiUsado1('');
        setObservacoes1('');
    
        // Navegando de volta para a tela de detalhes do PGR
        navigation.navigate('GerenciarDocumentos', { companyName });
    };

    return (
        <ScrollView style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Cadastrar Novo LTCAT para {companyName}</Text>
            </View>
            <View style={stylesPages.containerIn2}>
                <Text style={stylesDetails.textConteudo}>Título do LTCAT</Text>
                <TextInput 
                    placeholder="Título do LTCAT" 
                    value={titulo} 
                    onChangeText={setTitulo} 
                    style={stylesTextImput.TextImput} 
                />

                <Text style={stylesDetails.textConteudo}>Data</Text>
                <TextInput 
                    placeholder="Data" 
                    value={data} 
                    onChangeText={setData} 
                    style={stylesTextImput.TextImput} 
                />

                <Text style={stylesDetails.textConteudo}>Dados do Ambiente de Trabalho</Text>
                <TextInput 
                    placeholder="Setor" 
                    value={setor} 
                    onChangeText={setSetor} 
                    style={stylesTextImput.TextImput} 
                />

                <TextInput 
                    placeholder="Descrição da Atividade" 
                    value={descricaoAtividade} 
                    onChangeText={setDescricaoAtividade} 
                    style={stylesTextImput.TextImput}
                />
                <TextInput 
                    placeholder="Equipamentos Utilizados" 
                    value={equipamento} 
                    onChangeText={setEquipamento} 
                    style={stylesTextImput.TextImput}
                />

                <Text style={stylesDetails.textConteudo}>Análise das Condições Ambientais</Text>
                <TextInput 
                    placeholder="Agente Nocivo" 
                    value={agenteNocivo} 
                    onChangeText={setAgenteNocivo} 
                    style={stylesTextImput.TextImput}
                />
                <TextInput 
                    placeholder="Intensidade" 
                    value={intensidade} 
                    onChangeText={setIntensidade} 
                    style={stylesTextImput.TextImput}
                />
                <TextInput 
                    placeholder="Classe de Risco" 
                    value={classeRisco} 
                    onChangeText={setClasseRisco} 
                    style={stylesTextImput.TextImput}
                />
                <TextInput 
                    placeholder="EPI Usado" 
                    value={epiUsado} 
                    onChangeText={setEpiUsado} 
                    style={stylesTextImput.TextImput}
                />
                <TextInput 
                    placeholder="Observações" 
                    value={observacoes} 
                    onChangeText={setObservacoes} 
                    style={stylesTextImput.TextImput}
                />

                <TextInput 
                    placeholder="Agente Nocivo" 
                    value={agenteNocivo1} 
                    onChangeText={setAgenteNocivo1} 
                    style={stylesTextImput.TextImput}
                />
                <TextInput 
                    placeholder="Intensidade" 
                    value={intensidade1} 
                    onChangeText={setIntensidade1} 
                    style={stylesTextImput.TextImput}
                />
                <TextInput 
                    placeholder="Classe de Risco" 
                    value={classeRisco1} 
                    onChangeText={setClasseRisco1} 
                    style={stylesTextImput.TextImput}
                />
                <TextInput 
                    placeholder="EPI Usado" 
                    value={epiUsado1} 
                    onChangeText={setEpiUsado1} 
                    style={stylesTextImput.TextImput}
                />
                <TextInput 
                    placeholder="Observações" 
                    value={observacoes1} 
                    onChangeText={setObservacoes1} 
                    style={stylesTextImput.TextImput}
                />

                <TouchableOpacity 
                onPress={() => navigation.navigate('GerenciarDocumentos', { companyName })}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Cancelar Cadastro</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={handleAddLTCAT}
                style={stylesPages.button}>
                   <Text style={stylesPages.buttonText}>Comfirmar Cadastro</Text>
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

export default LTCATScreen;
