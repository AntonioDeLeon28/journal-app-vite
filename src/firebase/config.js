// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcgqkWN8AHMFLWosx9v4ovz4hyRTc0KME",
  authDomain: "react-cursos-6b3e1.firebaseapp.com",
  projectId: "react-cursos-6b3e1",
  storageBucket: "react-cursos-6b3e1.appspot.com",
  messagingSenderId: "394035180969",
  appId: "1:394035180969:web:f1736d40fe0476f8b4c0b8"
};

// Initialize Firebase

export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );

