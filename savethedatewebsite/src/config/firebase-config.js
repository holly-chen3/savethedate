// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjLLA6SX6nQjlLJyazGy8FLqn0fjI0WPs",
  authDomain: "techteletubbies.firebaseapp.com",
  databaseURL: "https://techteletubbies-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "techteletubbies",
  storageBucket: "techteletubbies.appspot.com",
  messagingSenderId: "736166847470",
  appId: "1:736166847470:web:be4eebe140f7fb579ee4ff",
  measurementId: "G-EX6G49T97W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
// firebase login
// firebase init
// firebase deploy