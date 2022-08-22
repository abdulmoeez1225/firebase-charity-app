// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeWsB7IcszSmkASOfq6NGmiCC7ngzDXko",
  authDomain: "crypto-donation-app.firebaseapp.com",
  projectId: "crypto-donation-app",
  storageBucket: "crypto-donation-app.appspot.com",
  messagingSenderId: "978594363578",
  appId: "1:978594363578:web:46f739a5f56e5f8802ea83",
  measurementId: "G-WV9QQW7T59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const userId = Math.floor(Date.now() + Math.random().toString());
console.log(userId);
export { app, db, userId }