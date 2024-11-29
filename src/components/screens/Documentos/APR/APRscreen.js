import React, { useState, useContext } from 'react';
import { Text, TextInput, Button, Alert, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import stylesPages from '../../../Styles/StylesPages';
import stylesDetails from '../../../Styles/StylesDetails';
import stylesTextImput from '../../../Styles/StylesTextImput';

const APRscreen = ({ navigation, route }) => {
    const { companyName, company } = route.params; // Obtendo o nome da empresa da rota
    const { addAPR } = useContext(AuthContext);

    // Definindo os estados para os campos do PGR
    const [titulo, setTitulo] = useState('');
    const [ramoAtividade, setRamoAtividade] = useState('');
    const [riscoIdentificado, setRiscoIdentificado] = useState('');
    const [descricaoRisco, setDescricaoRisco] = useState('');
    const [consequencias, setConsequencias] = useState('');
    const [severidade, setSeveridade] = useState('');
    const [classificacao, setClassificacao] = useState('');
    const [riscoIdentificado2, setRiscoIdentificado2] = useState('');
    const [descricaoRisco2, setDescricaoRisco2] = useState('');
    const [consequencias2, setConsequencias2] = useState('');
    const [severidade2, setSeveridade2] = useState('');
    const [classificacao2, setClassificacao2] = useState('');
    const [equipamentos, setEquipamentos] = useState('');
    const [equipamentos2, setEquipamentos2] = useState('');
    const [ambienteTrabalho, setAmbienteTrabalho] = useState('');
    const [sinalizacao, setSinalizacao] = useState('');
    const [treinamentos, setTreinamentos] = useState('');

    const tipo="APR";
    const cnpj = company.cnpj;
    const fantasia = company.nomeFantasia;
    const handleAddAPR = async () => {
        if (titulo.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira o título do APR.');
            return;
        }

    
        // Chamando a função addPGR com os novos dados
        await addAPR(companyName, {
            tipo,
            titulo,
            ramoAtividade,
            riscoIdentificado,
            descricaoRisco,
            consequencias,
            severidade,
            classificacao,
            riscoIdentificado2,
            descricaoRisco2,            
            consequencias2,
            severidade2,
            classificacao2,
            equipamentos,
            equipamentos2,
            ambienteTrabalho,
            sinalizacao,
            treinamentos,
            cnpj,
            fantasia

        });
    
        // Limpando os campos após o cadastro
        setTitulo('');

    
        // Navegando de volta para a tela de detalhes do PGR
        navigation.navigate('GerenciarDocumentos', { companyName });
    };

    return (
        <ScrollView style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Nova APR para {companyName}</Text>
            </View>
            <View style={stylesPages.containerIn2}>
                <Text style={stylesDetails.textConteudo}>Título do APR</Text>
                <TextInput 
                    placeholder="Título do APR" 
                    value={titulo} 
                    onChangeText={setTitulo} 
                    style={stylesTextImput.TextImput} 
                />

                <Text style={stylesDetails.textConteudo}>Ramo de Atividade</Text>
                <TextInput 
                    placeholder="Ramo de Atividade" 
                    value={ramoAtividade} 
                    onChangeText={setRamoAtividade} 
                    style={stylesTextImput.TextImput} 
                />

                <Text style={stylesDetails.textConteudo}>Identificação dos Riscos</Text>
                <TextInput
                    placeholder="Risco Identificado"
                    value={riscoIdentificado}
                    onChangeText={setRiscoIdentificado}
                    style={stylesTextImput.TextImput}
                />
                <TextInput
                    placeholder="Descrição do Risco"
                    value={descricaoRisco}
                    onChangeText={setDescricaoRisco}
                    style={stylesTextImput.TextImput}
                />  
                <TextInput
                    placeholder="Consequências"
                    value={consequencias}
                    onChangeText={setConsequencias}
                    style={stylesTextImput.TextImput}
                />
                <TextInput
                    placeholder="Severidade"
                    value={severidade}
                    onChangeText={setSeveridade}
                    style={stylesTextImput.TextImput}
                />
                <TextInput
                    placeholder="Classificação"
                    value={classificacao}
                    onChangeText={setClassificacao}
                    style={stylesTextImput.TextImput}
                />

                <Text style={stylesDetails.textConteudo}>Identificação dos Riscos 2</Text>
                <TextInput
                    placeholder="Risco Identificado"
                    value={riscoIdentificado2}
                    onChangeText={setRiscoIdentificado2}
                    style={stylesTextImput.TextImput}
                />
                <TextInput
                    placeholder="Descrição do Risco"
                    value={descricaoRisco2}
                    onChangeText={setDescricaoRisco2}
                    style={stylesTextImput.TextImput}    
                />
                <TextInput
                    placeholder="Consequências"
                    value={consequencias2}
                    onChangeText={setConsequencias2}
                    style={stylesTextImput.TextImput}
                />
                <TextInput
                    placeholder="Severidade"
                    value={severidade2}
                    onChangeText={setSeveridade2}
                    style={stylesTextImput.TextImput}
                />
                <TextInput
                    placeholder="Classificação"
                    value={classificacao2}
                    onChangeText={setClassificacao2}
                    style={stylesTextImput.TextImput}
                />

                <Text style={stylesDetails.textConteudo}>Equipamentos de Proteção Individual</Text>
                <TextInput
                    placeholder="Equipamentos de Proteção Individual"
                    value={equipamentos}
                    onChangeText={setEquipamentos}
                    style={stylesTextImput.TextImput}
                />
                <TextInput
                    placeholder="Equipamentos de Proteção Individual"
                    value={equipamentos2}
                    onChangeText={setEquipamentos2}
                    style={stylesTextImput.TextImput}
                />

                <Text style={stylesDetails.textConteudo}>Condições de Trabalho</Text>
                <TextInput
                    placeholder="Ambiente de Trabalho"
                    value={ambienteTrabalho}
                    onChangeText={setAmbienteTrabalho}
                    style={stylesTextImput.TextImput}
                />
                <TextInput
                    placeholder="Sinalização"
                    value={sinalizacao}
                    onChangeText={setSinalizacao}
                    style={stylesTextImput.TextImput}
                />
                <TextInput
                    placeholder="Treinamentos Necessários"
                    value={treinamentos}
                    onChangeText={setTreinamentos}
                    style={stylesTextImput.TextImput}
                />

                <TouchableOpacity 
                onPress={() => navigation.navigate('GerenciarDocumentos', { companyName })}
                style={stylesPages.button}>
                    <Text style={stylesPages.buttonText}>Cancelar Cadastro</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={handleAddAPR}
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

export default APRscreen;
