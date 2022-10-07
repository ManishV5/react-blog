import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCBt2zl35QceJrhy4kKMKveoHXn6Hu7AUA",
    authDomain: "reactfour-80385.firebaseapp.com",
    projectId: "reactfour-80385",
    storageBucket: "reactfour-80385.appspot.com",
    messagingSenderId: "708465499143",
    appId: "1:708465499143:web:5fc11a1f6cfd18a6f75ea2"
};


const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()