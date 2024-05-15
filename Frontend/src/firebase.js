// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b613e.firebaseapp.com",
  projectId: "mern-auth-b613e",
  storageBucket: "mern-auth-b613e.appspot.com",
  messagingSenderId: "58191657651",
  appId: "1:58191657651:web:5ac4887a922fb7b3924ec6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
