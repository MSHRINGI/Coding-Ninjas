// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV4HeU1dt6IMzHU9lZldOg_aBBoBH9OFg",
  authDomain: "react-hooks-blog-cbc3e.firebaseapp.com",
  projectId: "react-hooks-blog-cbc3e",
  storageBucket: "react-hooks-blog-cbc3e.appspot.com",
  messagingSenderId: "40109167197",
  appId: "1:40109167197:web:35e0218fe99ee0b0fdb3b4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
