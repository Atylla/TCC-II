import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import stylesPages from '../../Styles/StylesPages';
import stylesTextImput from '../../Styles/StylesTextImput';

const GerenciarDocumentos = ({ navigation, route }) => {
    const { companyName, company } = route.params;
    const { getPGR, getPCMSO, getLTCAT, getAPR, getOS, getPT, user } = useContext(AuthContext);  // Incluindo getPGR aqui
    const [modalVisible, setModalVisible] = useState(false);
    const [pgrList, setPgrList] = useState([]);
    const [pcmsoList, setPcmsoList] = useState([]);
    const [ltcatList, setLTCATList] = useState([]);
    const [aprList, setAPRList] = useState([]);
    const [osList, setOSList] = useState([]);
    const [ptList, setPTList] = useState([]);

    const fetchPGRs = async () => {
        if (user) {
            const pgrs = await getPGR(companyName);  
            setPgrList(pgrs);  
        }
    };
    const fetchPCMSOs = async () => {
        if (user) {
            const pcmsos = await getPCMSO(companyName);  
            setPcmsoList(pcmsos);  
        }
    };
    const fetchLTCATs = async () => {
        if (user) {
            const ltcats = await getLTCAT(companyName); 
            setLTCATList(ltcats);  
        }
    };
    const fecthAPR = async () => {
        if (user) {
            const aprs = await getAPR(companyName);  
            setAPRList(aprs);  
        }
    }
    const fetchOS = async () => {
        if (user) {
            const os = await getOS(companyName);  
            setOSList(os);  
        }
    }
    const fetchPT = async () => {
        if (user) {
            const pts = await getPT(companyName); 
            setPTList(pts);  
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            fetchPGRs();  
            fetchPCMSOs();
            fetchLTCATs();
            fecthAPR();
            fetchOS();
            fetchPT();
        }, [companyName, user]) 
    );
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const pgrs = await getPGR(companyName);  
                setPgrList(pgrs);  
                const pcmsos = await getPCMSO(companyName);  
                setPcmsoList(pcmsos);  
                const ltcats = await getLTCAT(companyName);  
                setLTCATList(ltcats);  
                const aprs = await getAPR(companyName);
                setAPRList(aprs);  
                const os = await getOS(companyName); 
                setOSList(os);  
                const pts = await getPT(companyName); 
                setPTList(pts); 
            }
        };
        fetchData();
    }, [companyName, user]);
    
    const handleMenuOption = (option) => {
        if (option === 'PGR') {
            navigation.navigate('PGRscreen', { companyName, company });
        } 
        else if (option === 'PCMSO') {
            navigation.navigate('PCMSOScreen', { companyName, company });
        }
        else if (option === 'LTCAT') {
            navigation.navigate('LTCATScreen', { companyName, company });
        }
        else if (option === 'APR') {
            navigation.navigate('APRscreen', { companyName, company });
        }
        else if (option === 'OS') {
            navigation.navigate('OSscreen', { companyName, company });
        }
        else if (option === 'permissão') {
            navigation.navigate('PTscreen', { companyName, company });
        }
        else {
            navigation.navigate('GerenciarDocumentos', { type: option, companyName });
        }
        setModalVisible(false);
    };
    const renderPGRItem = ({ item }) => {
        if (!item || !item.titulo) {
            return <Text>Dados de PGR indisponíveis ou incompletos</Text>;
        }
        if (item.tipo == "PGR"){
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('PGRdetalhes', { companyName, pgrData: item })}
                style={stylesPages.listasFlatList}
            >
                <Text style={styles.Title}>{item.titulo || 'Título não disponível'}</Text>
                <Text style={styles.Detail}>{item.tipo || 'CNPJ não disponível'}</Text>
                <Text style={styles.Detail}>Empresa: {companyName || 'Não especificado'}</Text>
            </TouchableOpacity>
        );
    };
    };
    const renderPCMSOItem = ({ item }) => {
        if (!item || !item.titulo) {
            return <Text>Dados de PCMSO indisponíveis ou incompletos</Text>;
        }
        if (item.tipo == "PCMSO"){
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('PCMSOdetalhes', { companyName, pcmsoData: item })}
                style={stylesPages.listasFlatList}
            >
                <Text style={styles.Title}>{item.titulo || 'Título não disponível'}</Text>
                <Text style={styles.Detail}>{item.tipo || 'CNPJ não disponível'}</Text>
                <Text style={styles.Detail}>Empresa: {companyName || 'Não especificado'}</Text>
            </TouchableOpacity>
        );
        };
    };
    const renderLTCATItem = ({ item }) => {
        if (!item || !item.titulo) {
            return <Text>Dados de LTCAT indisponíveis ou incompletos</Text>;
        }
        if (item.tipo == "LTCAT"){
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('LTCATdetalhes', { companyName, ltcatData: item })}
                style={stylesPages.listasFlatList}
            >
                <Text style={styles.Title}>{item.titulo || 'Título não disponível'}</Text>
                <Text style={styles.Detail}>{item.tipo || 'CNPJ não disponível'}</Text>
                <Text style={styles.Detail}>Empresa: {companyName || 'Não especificado'}</Text>
            </TouchableOpacity>
        );
        };
    };
    const renderAPRItem = ({ item }) => {
        if (!item || !item.titulo) {
            return <Text>Dados de APR indisponíveis ou incompletos</Text>;
        }
        if (item.tipo == "APR"){
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('APRdetalhes', { companyName, aprData: item })}
                style={stylesPages.listasFlatList}
            >
                <Text style={styles.Title}>{item.titulo || 'Título não disponível'}</Text>
                <Text style={styles.Detail}>{item.tipo || 'CNPJ não disponível'}</Text>
                <Text style={styles.Detail}>Empresa: {companyName || 'Não especificado'}</Text>
            </TouchableOpacity>
        );
        };
    };
    const renderOSItem = ({ item }) => {
        if (!item || !item.titulo) {
            return <Text>Dados de OS indisponíveis ou incompletos</Text>;
        }
        if (item.tipo == "OS"){
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('OSdetalhes', { companyName, osData: item })}
                style={stylesPages.listasFlatList}
            >
                <Text style={styles.Title}>{item.titulo || 'Título não disponível'}</Text>
                <Text style={styles.Detail}>{item.tipo || 'CNPJ não disponível'}</Text>
                <Text style={styles.Detail}>Empresa: {companyName || 'Não especificado'}</Text>
            </TouchableOpacity>
        );
        };
    };
    const renderPTItem = ({ item }) => {
        if (!item || !item.titulo) {
            return <Text>Dados de PT indisponíveis ou incompletos</Text>;
        }
        if (item.tipo == "PT"){
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('PTdetalhes', { companyName, ptData: item })}
                style={stylesPages.listasFlatList}
            >
                <Text style={styles.Title}>{item.titulo || 'Título não disponível'}</Text>
                <Text style={styles.Detail}>{item.tipo || 'CNPJ não disponível'}</Text>
                <Text style={styles.Detail}>Empresa: {companyName || 'Não especificado'}</Text>
            </TouchableOpacity>
        );
    };
    };
    return (
        <View style={stylesPages.container}>
            <View style={stylesPages.containerIn1}>
                <Text style={stylesPages.textTitulo}>Gerenciar Documentos para {companyName}</Text>
            </View>
            <View style={stylesPages.containerIn2}>
                    <TouchableOpacity 
                    style={stylesPages.button}
                    onPress={() => setModalVisible(true)}>
                        <Text style={stylesPages.buttonText}>CheckLists</Text>
                    </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Escolha um Checklist</Text>
                            <TouchableOpacity style={styles.optionButton} onPress={() => handleMenuOption('PGR')}>
                                <Text style={stylesPages.textModal}>PGR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => handleMenuOption('PCMSO')}>
                                <Text style={stylesPages.textModal}>PCMSO</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => handleMenuOption('LTCAT')}>
                                <Text style={stylesPages.textModal}>LTCAT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => handleMenuOption('APR')}>
                                <Text style={stylesPages.textModal}>APR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => handleMenuOption('OS')}>
                                <Text style={stylesPages.textModal}>OS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={() => handleMenuOption('permissão')}>
                                <Text style={stylesPages.textModal}>Permissão de Trabalho</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={stylesPages.textModal}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                        <FlatList
                            data={pgrList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderPGRItem}
                            ListEmptyComponent={<Text>Nenhum PGR cadastrado.</Text>}
                            style={stylesPages.FlatList}
                        />
                        <FlatList
                            data={pcmsoList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderPCMSOItem}
                            ListEmptyComponent={<Text>Nenhum PCMSO cadastrado.</Text>}
                            style={stylesPages.FlatList}
                        />
                        <FlatList
                            data={ltcatList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderLTCATItem}
                            ListEmptyComponent={<Text>Nenhum LTCAT cadastrado.</Text>}
                            style={stylesPages.FlatList}
                        />
                        <FlatList
                            data={aprList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderAPRItem}
                            ListEmptyComponent={<Text>Nenhum APR cadastrado.</Text>}
                            style={stylesPages.FlatList}
                        />
                        <FlatList
                            data={osList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderOSItem}
                            ListEmptyComponent={<Text>Nenhum OS cadastrado.</Text>}
                            style={stylesPages.FlatList}
                        />
                        <FlatList
                            data={ptList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderPTItem}
                            ListEmptyComponent={<Text>Nenhum PT cadastrado.</Text>}
                            style={stylesPages.FlatList}
                        />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 250,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    optionButton: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#e74c3c',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    Item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    Title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    Detail: {
        fontSize: 14,
        color: '#555',
    },
});

export default GerenciarDocumentos;