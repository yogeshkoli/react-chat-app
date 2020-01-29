import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyB_PEFA_NtlEpQ7-SUPwNfxCKWgnFICO4w",
    authDomain: "react-chat-dev.firebaseapp.com",
    databaseURL: "https://react-chat-dev.firebaseio.com",
    projectId: "react-chat-dev",
    storageBucket: "react-chat-dev.appspot.com",
    messagingSenderId: "469869420867",
    appId: "1:469869420867:web:c4b0fa81c915a663f64ff6",
    measurementId: "G-RY4C7703C9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;