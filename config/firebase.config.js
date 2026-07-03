//Conectamos a Firebase usando el SDK de cliente (no el Admin SDK).
// Las credenciales NO están escritas acá adentro:
// se leen del .env para no exponerlas ni subirlas a git
// (.env está en .gitignore).
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Inicializamos la app de Firebase con esa configuración
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);