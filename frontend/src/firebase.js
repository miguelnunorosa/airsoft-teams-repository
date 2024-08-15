// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAjH15rwwXVOlkIv0EH_735IISKtyKJs28",
    authDomain: "airsoft-diretorio-equipas.firebaseapp.com",
    projectId: "airsoft-diretorio-equipas",
    storageBucket: "airsoft-diretorio-equipas.appspot.com",
    messagingSenderId: "853525090940",
    appId: "1:853525090940:web:54f97500ee7f9f979feff9",
    measurementId: "G-BDD81RX4E7"
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export { db, collection, getDocs, query, where };
