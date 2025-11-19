// Importar SDKs do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// ⚠️ Coloque suas credenciais do Firebase aqui
const firebaseConfig = {
  apiKey: "AIzaSyArrjT3nFm9NyC-5C3so3lNmfKb_ySH5hc",
  authDomain: "periferia-ecommerce.firebaseapp.com",
  projectId: "periferia-ecommerce",
  storageBucket: "periferia-ecommerce.firebasestorage.app",
  messagingSenderId: "266487906438",
  appId: "1:266487906438:web:4c06e20cabaa5308a51107",
  measurementId: "G-BDRDLKCERB"
};

// Inicializar
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
