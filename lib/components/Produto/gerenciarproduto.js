import {View, Text, StyleSheet, Button, TouchableOpacity, Keyboard, FlatList, ActivityIndicator} from 'react-native';
import { TextInput } from 'react-native-paper';
import React, { useState, useEffect, useRef } from 'react'; 
import firebase from '../../services/connectinFirebase';
import Listagem from './listagem';

const Separator = () => { 
    return <View style={styles.separator} />; 
} 

export default function GerenciarProduto() {

    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [preco, setPreco] = useState('');
    const [cor, setCor] = useState('');
    const [key, setKey] = useState('');
    const [produtos, setProdutos] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const inputRef = useRef(null); 

    useEffect(() => { 

        async function search() { 

          await firebase.database().ref('produtos').on('value', (snapshot) => { 

            setProdutos([]); 

            snapshot.forEach((chilItem) => { 

              let data = { 
                key: chilItem.key, 
                nome: chilItem.val().nome, 
                marca: chilItem.val().marca, 
                preco: chilItem.val().preco, 
                cor: chilItem.val().cor, 
              }; 

              setProdutos(oldArray => [...oldArray, data].reverse()); 
            }) 

            setLoading(false); 
          }) 
        } 

        search(); 
      }, []); 

async function insertUpdate() { 
    if (
       (nome !== '') & 
       (marca !== '') & 
       (preco !== '') & 
       (cor !== '') & 
       (key !== '') 
     ) { 
      firebase.database().ref('produtos').child(key).update({ 
        nome: nome, 
        marca: marca, 
        preco: preco, 
        cor: cor 
      }); 
      Keyboard.dismiss(); 
      alert('Produto Editado!'); 
      clearFields(); 
      setKey(""); 
      return; 
    } 

    let produtos = await firebase.database().ref('produtos'); 
    let chave = produtos.push().key; 
    produtos.child(chave).set({ 
      nome: nome, 
      marca: marca, 
      preco: preco, 
      cor:cor
    }); 

    Keyboard.dismiss(); 
    alert('Produto Cadastrado!'); 
    clearFields(); 
  } 

function clearFields(){
    setNome('');
    setMarca('');
    setPreco('');
    setCor('');
}

function handleDelete(key) {   
    firebase.database().ref('produtos').child(key).remove() 

      .then(() => { 
        const findProdutos = produtos.filter(item => item.key !== key) 
        setProdutos(findProdutos) 
      }) 
  } 

  function handleEdit(data) { 

      setKey(data.key), 
      setNome(data.nome), 
      setMarca(data.marca), 
      setPreco(data.preco), 
      setCor(data.cor) 
  } 

    return (

        <View style={styles.container}>
         <Separator/>           
            <TextInput
                placeholder='Produto'
                left={<TextInput.Icon icon="ticket-account" />}
                maxLength={40}
                style={styles.input}
                onChangeText={(text) => setNome(text)}
                value={nome}
                ref={inputRef} 
            />
        <Separator/>
            <TextInput
                placeholder='Marca'
                left={<TextInput.Icon icon="sale" />}
                style={styles.input}
                onChangeText={(text) => setMarca(text)}
                value={marca}
                ref={inputRef} 
            />
        <Separator/>
            <TextInput
                placeholder='Preço (R$)'
                left={<TextInput.Icon icon="sack" />}
                style={styles.input}
                onChangeText={(text) => setPreco(text)}
                value={preco}
                ref={inputRef} 
            />
        <Separator/>
            <TextInput
                placeholder='Cor'
                left={<TextInput.Icon icon="format-color-fill" />}
                style={styles.input}
                onChangeText={(text) => setCor(text)}
                value={cor}
                ref={inputRef} 
            />
          <View style={styles.button}> 
             <Button 
                onPress={insertUpdate} 
                title="Adicionar" 
                color="#3ea6f2" 
            /> 
          </View>             
     

<View> 

<Text style={styles.listar}>Listagem de Produtos</Text> 

</View> 



{loading ? 

( 

    <ActivityIndicator color="#121212" size={45} /> 

) : 

( 

    <FlatList 

        keyExtractor={item => item.key} 
        data={produtos} 
        renderItem={({ item }) => ( 
            <Listagem data={item} deleteItem={handleDelete} 
                editItem={handleEdit} /> 
        )} 
    /> 
) 
} 

</View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        margin: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: '#121212',
        height: 40,
        fontSize: 13,
        borderRadius: 8
    },

    separator: {
        marginVertical: 5,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3ea6f2',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 5,
    },

    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },

    buttonTextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginLeft: 100,
        fontSize: 20
    },

    buttonIconSeparatorStyle: {
        backgroundColor: '#fff',
        width: 1,
        height: 20,
    },

    listar: {
        fontSize: 20,
        textAlign: 'center'
    }
}); 