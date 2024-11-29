import { StyleSheet } from "react-native";


const stylesPages = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0FFFF',
    },
    containerIn1: {
        flex: 1,
        backgroundColor: '#E0FFFF',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerIn2: {
        flex: 2,
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        paddingBottom: 20,
    },
    button: {
        backgroundColor: '#E0FFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        width: '80%',
        borderRadius: 50,
        marginBottom: 5,
    },
    buttonText: {
        color: '#363636',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    textTitulo: {
        color: '#363636',
        fontSize: 30,
        fontWeight: 'bold',
    },
    text: {
        marginTop: 30,
        color: '#363636',
        fontSize: 20,
        marginBottom: 60,
    },
    FlatList: {
        marginTop: 8, 
        width: '80%',
    },
    listasFlatList: {
        justifyContent: 'space-between', 
        padding: 5, 
        borderBottomWidth: 1,
    },
    textModal: {
        color: '#363636',
        fontSize: 20,
    },
    scroll: {
        width: '100%',
        marginRight: 80,
    }
});

export default stylesPages;