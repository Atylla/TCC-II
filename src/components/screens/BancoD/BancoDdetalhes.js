import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import stylesPages from '../../Styles/StylesPages';
import stylesDetails from '../../Styles/StylesDetails';


const DetalhesItem = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={stylesPages.container}>
        <View style={stylesPages.containerIn1}>
            <Text style={stylesPages.textTitulo}>{item.nome}</Text>
        </View>
        <View style={stylesPages.containerIn2}>
            <Text style={stylesDetails.detalhes}>{item.descrição || item.detalhes || item.uso || 'Descrição não disponível'}</Text>
        </View>
    </View>
  );
};

export default DetalhesItem;