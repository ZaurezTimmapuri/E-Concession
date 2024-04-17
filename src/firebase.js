import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage'
import 'firebase/compat/firestore';
import 'firebase/analytics'

    const firebaseConfig = {
        apiKey: "AIzaSyA0SdZpj_5SZrM-Wa8w-IrHQyUbDDyzibo",
        authDomain: "e-concession.firebaseapp.com",
        projectId: "e-concession",
        storageBucket: "e-concession.appspot.com",
        messagingSenderId: "607679150345",
        appId: "1:607679150345:web:aa7864c9f8646171d37bd8",
        measurementId: "G-HT9RDMHN2X"
      };

    // Initialize Firebase
export const fireapp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;