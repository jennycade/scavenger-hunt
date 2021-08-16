import firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDoCOGdIG9jPi4aGz7FKwzbHf_5SDh1sIU",
    authDomain: "internet-scavenger-hunt.firebaseapp.com",
    projectId: "internet-scavenger-hunt",
    storageBucket: "internet-scavenger-hunt.appspot.com",
    messagingSenderId: "752928241674",
    appId: "1:752928241674:web:c05886462e0811e156c7f3",
    measurementId: "G-38YSE9140G"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = app.firestore();

export { firebase, app, db };