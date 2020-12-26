import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDayKA7WMJ4AAGFudTh04UK4GVSB1mDPak",
    authDomain: "vuetify-app-6ae9a.firebaseapp.com",
    projectId: "vuetify-app-6ae9a",
    storageBucket: "vuetify-app-6ae9a.appspot.com",
    messagingSenderId: "459901902559",
    appId: "1:459901902559:web:48e23250d9b0e12bbc136a",
    measurementId: "G-XX58EZ634L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.settings({timestampsInSnapshots: true});

export default db;