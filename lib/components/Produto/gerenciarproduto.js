import React, { useState, useEffect, useRef } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, FlatList, ActivityIndicator } from 'react-native'; 
import { TextInput } from 'react-native-paper'; 

export default function GerenciarProdutos() {
  const [nome, setNome] = useState(''); 
  const [marca, setMarca] = useState(''); 
  const [valor, setValor] = useState(''); 
  const [teor, seTeor] = useState(''); 
  const [descricao, setDescricao] = useState(''); 
  const [quantidade], setQuantidade = useState(''); 
  const [key, setKey] = useState(''); 

  return(
  <View style={styles.container}> 
  <TextInput 
      placeholder='nome' 
      left={<TextInput.Icon icon="nome" />} 
      maxLength={40} 
      style={styles.input} 
      onChangeText={(texto) => setNome(texto)} 
      value={nome} 
  /> 

  <TextInput 
      placeholder='Marca' 
      left={<TextInput.Icon icon="sale" />} 
      style={styles.input} 
      onChangeText={(texto) => setMarca(texto)} 
      value={marca} 
  /> 

  <TextInput 
      placeholder='Preço' 
      left={<TextInput.Icon icon="sack" />} 
      style={styles.input} 
      onChangeText={(texto) => setValor(texto)} 
      value={valor} 
  /> 

  <TextInput 
      placeholder='Cor' 
      left={<TextInput.Icon icon="color" />} 
      style={styles.input} 
      onChangeText={(texto) => setColor(texto)} 
      value={color} 
  />                  

</View> 

); 

} 




