import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo--bnKv20cY5iuLuTINQ9oghDyXxBfxs",
  authDomain: "cart-ec4db.firebaseapp.com",
  projectId: "cart-ec4db",
  storageBucket: "cart-ec4db.appspot.com",
  messagingSenderId: "683752847251",
  appId: "1:683752847251:web:51fd29715c872f6accda66"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

