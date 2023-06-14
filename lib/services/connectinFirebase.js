//biblioteca do firebase
import firebase from 'firebase/compat/app';
//autenticação de email e senha
import 'firebase/compat/auth';
//trabalha com o banco de dados criado no firebase
import 'firebase/compat/database';

let firebaseConfig = {
    apiKey: "AIzaSyD-wtmmS7AHFWi8u4KWB351wJnHk-uAmdc",
    authDomain: "dbloja-b2e95.firebaseapp.com",
    databaseURL: "https://dbloja-b2e95-default-rtdb.firebaseio.com",
    projectId: "dbloja-b2e95",
    storageBucket: "dbloja-b2e95.appspot.com",
    messagingSenderId: "1071051380275",
    appId: "1:1071051380275:web:535043b91155af8925f546"
};

if (!firebase.apps.length) {
    // Initialize Firebase
     firebase.initializeApp(firebaseConfig);
    }


export default firebase;