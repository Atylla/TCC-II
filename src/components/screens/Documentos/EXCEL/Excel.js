import React, { useState, useContext } from 'react';
import { Text, TextInput, Button, Alert, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import stylesPages from '../../../Styles/StylesPages';
import stylesDetails from '../../../Styles/StylesDetails';
import stylesTextImput from '../../../Styles/StylesTextImput';
const Excelscreen = ({ navigation, route }) => {
    const { companyName, company } = route.params; // Removendo excelData daqui
    const { addExcel } = useContext(AuthContext);

    const [titulo, setTitulo] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [data, setData] = useState('');
    const [setor, setSetor] = useState('');
    const [condicoes, setCondicoes] = useState('');
    const [riscos, setRiscos] = useState('');
    const [acoes, setAcoes] = useState('');
    const [datatreino, setDatatreino] = useState('');
    const [tipotreino, setTipotreino] = useState('');
    const [equipe, setEquipe] = useState('');
    const [nparticipantes, setNparticipantes] = useState('');

    const tipo = "Excel";

    const cnpj = company.cnpj;
    const fantasia = company.nomeFantasia;
    const handleAddExcel = async () => {
        if (titulo.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira o título do EXCEL.');
            return;
        }

        await addExcel(companyName, {
            tipo,
            titulo,
            periodo,
            data,
            setor,
            condicoes,
            riscos,
            acoes,
            datatreino,
            tipotreino,
            equipe,
            nparticipantes,
            cnpj,
            fantasia
        });
        console.log('cnpj',cnpj);

        setTitulo('');
        navigation.goBack();
    };

    return (
        <ScrollView style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Novo Relatório para {companyName}</Text>
            </View>
            <View style={stylesPages.containerIn2}>
                <Text style={stylesDetails.textConteudo}>Título do EXCEL</Text>
                <TextInput 
                    placeholder="Título" 
                    value={titulo} 
                    onChangeText={setTitulo} 
                    style={stylesTextImput.TextImput} 
                />
                
                <Text style={stylesDetails.textConteudo}>Período</Text>
                <TextInput 
                    placeholder="Período" 
                    value={periodo} 
                    onChangeText={setPeriodo} 
                    style={stylesTextImput.TextImput}
                />

                <Text style={stylesDetails.textConteudo}>Inspeções</Text>
                <TextInput 
                    placeholder="Data" 
                    value={data} 
                    onChangeText={setData} 
                    style={stylesTextImput.TextImput}
                />

                <TextInput
                    placeholder="Setor"
                    value={setor}
                    onChangeText={setSetor}
                    style={stylesTextImput.TextImput}
                />

                <TextInput
                    placeholder="Condições"
                    value={condicoes}
                    onChangeText={setCondicoes}
                    style={stylesTextImput.TextImput}
                />

                <TextInput
                    placeholder="Riscos"
                    value={riscos}
                    onChangeText={setRiscos}
                    style={stylesTextImput.TextImput}
                />

                <TextInput
                    placeholder="Ações"
                    value={acoes}
                    onChangeText={setAcoes}
                    style={stylesTextImput.TextImput}
                />

                <Text style={stylesDetails.textConteudo}>Treinamento</Text>

                <TextInput  
                    placeholder="Data"
                    value={datatreino}
                    onChangeText={setDatatreino}
                    style={stylesTextImput.TextImput}
                />

                <TextInput
                    placeholder="Tipo de Treinamento"
                    value={tipotreino}
                    onChangeText={setTipotreino}
                    style={stylesTextImput.TextImput}
                />

                <TextInput
                    placeholder="Equipe"
                    value={equipe}
                    onChangeText={setEquipe}
                    style={stylesTextImput.TextImput}
                />

                <TextInput
                    placeholder="N° Participantes"
                    value={nparticipantes}
                    onChangeText={setNparticipantes}
                    style={stylesTextImput.TextImput}
                />


                <TouchableOpacity 
                onPress={() => navigation.navigate('CompanyDetail', { companyName })}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Cancelar Cadastro</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={handleAddExcel}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Confirmar Cadastro</Text>
                </TouchableOpacity>

                

            </View>
        </ScrollView>
    );
};

export default Excelscreen;