// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxHtP6NSqlTnhg469uvx2bSBnkdE7kIbc",
  authDomain: "charity-donation-aebf0.firebaseapp.com",
  databaseURL: "https://charity-donation-aebf0-default-rtdb.firebaseio.com",
  projectId: "charity-donation-aebf0",
  storageBucket: "charity-donation-aebf0.appspot.com",
  messagingSenderId: "760422524932",
  appId: "1:760422524932:web:755b9cab1c19ff84386d51",
  measurementId: "G-DMM03X2FPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const userId = Math.floor(Date.now() + Math.random().toString());
console.log(userId);
export { app, db, userId }