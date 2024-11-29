import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import stylesPages from '../../Styles/StylesPages';
import stylesTextImput from '../../Styles/StylesTextImput';
import Dados from '../../../DadosDB/Dados.json';
import { Picker } from '@react-native-picker/picker';
import stylesDetails from '../../Styles/StylesDetails';

const BancoD = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [filteredItems, setFilteredItems] = useState([]);

  // Função para inicializar a lista com todos os itens quando nenhum filtro for selecionado
  useEffect(() => {
    if (!selectedCategory || selectedCategory === 'todos') {
      const allItems = Object.values(Dados).flat();
      setFilteredItems(allItems);
    } else {
      filterItems(searchTerm, selectedCategory);
    }
  }, [selectedCategory]);

  // Função para buscar e filtrar itens
  const handleSearch = (text) => {
    setSearchTerm(text);
    filterItems(text, selectedCategory);
  };

  // Função de filtragem principal
  const filterItems = (text, category) => {
    let items = [];
    if (category && Dados[category]) {
      items = Dados[category].filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(text.toLowerCase())
      );
    } else {
      items = Object.values(Dados).flat().filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(text.toLowerCase())
      );
    }
    setFilteredItems(items);
  };

  // Atualiza a lista filtrada quando a categoria é alterada
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'todos') {
      setSelectedCategory(''); // Reseta a categoria e exibe todos os itens
      filterItems(searchTerm, ''); // Filtra todos os itens novamente
    } else {
      filterItems(searchTerm, category);
    }
  };

  return (
    <View style={stylesPages.container}>
      <View style={stylesPages.containerIn1}>
        <Text style={stylesPages.textTitulo}>Pesquisa</Text>
      </View>

      <View style={stylesPages.containerIn2}>
        <TextInput
          style={stylesTextImput.TextImput}
          placeholder="Pesquisar itens..."
          value={searchTerm}
          onChangeText={handleSearch}
        />


        <Text style={stylesDetails.textConteudo}>Filtrar por Categoria:</Text>
        <Picker
          selectedValue={selectedCategory}
          style={stylesTextImput.TextImput}
          onValueChange={handleCategoryChange}
        >
            <Picker.Item label="Selecione uma categoria" value="" />
            <Picker.Item label="Todos" value="todos" />
        
            <Picker.Item label="Funções" value="funções" />
            <Picker.Item label="Riscos" value="riscos" />
            <Picker.Item label="EPIs" value="EPIs" />
            <Picker.Item label="Exames" value="exames" />
        </Picker>

        {/* Lista de Resultados Filtrados */}
        <FlatList
          style={stylesPages.FlatList}
          data={filteredItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetalhesItem', { item })}
              style={stylesPages.itemButton}
            >
              <Text style={stylesPages.button}>{item.nome}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <Text style={stylesTextImput.textError}>Nenhum item encontrado.</Text>
          )}
        />
      </View>
    </View>
  );
};

export default BancoD;