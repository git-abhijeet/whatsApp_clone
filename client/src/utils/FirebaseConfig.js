import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDj41de6xQAmsOtDDecQRb30yMPuUvuViU",
    authDomain: "whatsapp-clone-b2211.firebaseapp.com",
    projectId: "whatsapp-clone-b2211",
    storageBucket: "whatsapp-clone-b2211.appspot.com",
    messagingSenderId: "425700432143",
    appId: "1:425700432143:web:544446b904fb078f65c67a",
    measurementId: "G-S70ZLW31DE"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);