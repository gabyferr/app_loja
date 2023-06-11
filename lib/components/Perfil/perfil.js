import {View, Text, StyleSheet, Button, TouchableOpacity, Keyboard, FlatList, ActivityIndicator} from 'react-native';
import { TextInput } from 'react-native-paper';
import React, { useState, useEffect, useRef } from 'react'; 
import firebase from '../../services/connectinFirebase';

const Separator = () => { 
    return <View style={styles.separator} />; 
} 

export default function Perfil() {

    const [nome, setNome] = useState('');
    const [nascimento, setNascimento] = useState('');       
    const [sexo, setSexo] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState(''); 
    const [key, setKey] = useState('');


//implementação dos métodos update ou insert 

async function insertUpdate() { 
    //editar dados 
    if (
       (nome !== '') & 
       (nascimento !== '') & 
       (sexo !== '') & 
       (estado !== '') & 
       (cidade !== '') &        
       (key !== '') 
     ) { 
      firebase.database().ref('perfil').child(key).update({ 
        nome: nome, 
        nascimento: nascimento, 
        sexo: sexo, 
        estado: estado,
        cidade: cidade 
      }); 
      Keyboard.dismiss(); 
      alert('Perfil Editado!'); 
      clearFields(); 
      setKey(""); 
      return; 
    } 

    //cadastrar dados 
    let perfil = await firebase.database().ref('perfil'); 
    let chave = perfil.push().key; //comando para salvar é o push 
    perfil.child(chave).set({ 
        nome: nome, 
        nascimento: nascimento, 
        sexo: sexo, 
        estado: estado,
        cidade: cidade,
    }); 

    Keyboard.dismiss(); 
    alert('Perfil Cadastrado!'); 
    clearFields(); 
  } 

//método para limpar os campos com valores
function clearFields(){
    setNome('');
    setNascimento('');
    setSexo('');
    setEstado('');
    setCidade('');
}

    return (

        <View style={styles.container}>
         <Separator/>           
            <TextInput
                placeholder='Nome'
                left={<TextInput.Icon icon="account-edit" />}
                maxLength={40}
                style={styles.input}
                onChangeText={(text) => setNome(text)}
                value={nome}
            />
        <Separator/>
            <TextInput
                placeholder='Nascimento'
                left={<TextInput.Icon icon="calendar-week" />}
                style={styles.input}
                onChangeText={(text) => setNascimento(text)}
                value={nascimento}
            />
        <Separator/>
            <TextInput
                placeholder='Sexo'
                left={<TextInput.Icon icon="gender-male-female" />}
                style={styles.input}
                onChangeText={(text) => setSexo(text)}
                value={sexo}
            />
        <Separator/>
            <TextInput
                placeholder='Estado'
                left={<TextInput.Icon icon="map-marker" />}
                style={styles.input}
                onChangeText={(text) => setEstado(text)}
                value={estado}
            />
        <Separator/>
            <TextInput
                placeholder='Cidade'
                left={<TextInput.Icon icon="city" />}
                style={styles.input}
                onChangeText={(text) => setCidade(text)}
                value={cidade}
            />            
          <View style={styles.button}> 
             <Button 
                onPress={insertUpdate} 
                title="Adicionar" 
                color="#3ea6f2" 
            /> 
          </View>             
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