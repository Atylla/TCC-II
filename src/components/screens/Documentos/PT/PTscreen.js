import React, { useState, useContext } from 'react';
import { Text, TextInput, Button, Alert, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import stylesPages from '../../../Styles/StylesPages';
import stylesDetails from '../../../Styles/StylesDetails';
import stylesTextImput from '../../../Styles/StylesTextImput';

const PTscreen = ({ navigation, route }) => {
    const { companyName, company } = route.params; // Obtendo o nome da empresa da rota
    const { addPT } = useContext(AuthContext);

    // Definindo os estados para os campos do PGR
    const [titulo, setTitulo] = useState('');
    const [setor, setSetor] = useState('');
    const [descricaoServico, setDescricaoServico] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [equipe, setEquipe] = useState('');
    const [riscos, setRiscos] = useState('');
    const [medidas, setMedidas] = useState('');
    const [equipamentos, setEquipamentos] = useState('');


    const tipo="PT";
    const cnpj = company.cnpj;
    const fantasia = company.nomeFantasia;
    const handleAddPT = async () => {
        if (titulo.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira o título do PT.');
            return;
        }

    
        // Chamando a função addPGR com os novos dados
        await addPT(companyName, {
            tipo,
            titulo,
            cnpj,
            fantasia,
            setor,
            descricaoServico,
            dataInicio,
            dataFim,
            equipe,
            riscos,
            medidas,
            equipamentos

        });
    
        // Limpando os campos após o cadastro
        setTitulo('');
        setSetor('');
        setDescricaoServico('');
        setDataInicio('');
        setDataFim('');
        setEquipe('');
        setRiscos('');
        setMedidas('');
        setEquipamentos('');

    
        // Navegando de volta para a tela de detalhes do PGR
        navigation.navigate('GerenciarDocumentos', { companyName });
    };

    return (
        <ScrollView style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Nova Permissão de Trabalho para {companyName}</Text>
            </View>
            <View style={stylesPages.containerIn2}>
                <Text style={stylesDetails.textConteudo}>Título</Text>
                <TextInput 
                    placeholder="Título do PT" 
                    value={titulo} 
                    onChangeText={setTitulo} 
                    style={stylesTextImput.TextImput} 
                />

                <Text style={stylesDetails.textConteudo}>Serviço</Text>
                <TextInput
                    placeholder="Setor"
                    value={setor}
                    onChangeText={setSetor}
                    style={stylesTextImput.TextImput}
                />
                <TextInput  
                    placeholder="Descricão do Serviço"
                    value={descricaoServico}
                    onChangeText={setDescricaoServico}
                    style={stylesTextImput.TextImput}
                />
                <TextInput  
                    placeholder="Data de Início"
                    value={dataInicio}
                    onChangeText={setDataInicio}
                    style={stylesTextImput.TextImput}
                />
                <TextInput  
                    placeholder="Data de Fim"
                    value={dataFim}
                    onChangeText={setDataFim}
                    style={stylesTextImput.TextImput}
                />
                <TextInput  
                    placeholder="Equipe"
                    value={equipe}
                    onChangeText={setEquipe}
                    style={stylesTextImput.TextImput}
                />

                <Text style={stylesDetails.textConteudo}>Riscos Identificados e Medidas de Controle</Text>
                <TextInput  
                    placeholder="Riscos"
                    value={riscos}
                    onChangeText={setRiscos}
                    style={stylesTextImput.TextImput}
                />
                <TextInput  
                    placeholder="Medidas"
                    value={medidas}
                    onChangeText={setMedidas}
                    style={stylesTextImput.TextImput}
                />

                <Text style={stylesDetails.textConteudo}>Equipamentos Necessários</Text>
                <TextInput  
                    placeholder="Equipamentos"
                    value={equipamentos}
                    onChangeText={setEquipamentos}
                    style={stylesTextImput.TextImput}
                />


                <TouchableOpacity 
                onPress={() => navigation.navigate('GerenciarDocumentos', { companyName })}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Cancelar Cadastro</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={handleAddPT}
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

export default PTscreen;
