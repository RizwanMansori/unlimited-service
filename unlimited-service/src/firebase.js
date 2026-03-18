// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBAzirKfexsfc110OJLWnb-9BQd2nuAmZg",
  authDomain: "unlimited-service-d6cdc.firebaseapp.com",
  projectId: "unlimited-service-d6cdc",
  storageBucket: "unlimited-service-d6cdc.firebasestorage.app",
  messagingSenderId: "949087840422",
  appId: "1:949087840422:web:9a6e390192c0a9e5fcec67",
  measurementId: "G-S0G33L2Q1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database export
export const db = getFirestore(app);