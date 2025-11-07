import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
// Using the project ID from .firebaserc
const firebaseConfig = {
  projectId: "archaean-app",
  authDomain: "archaean-app.firebaseapp.com",
  storageBucket: "archaean-app.firebasestorage.app",
  messagingSenderId: "653164789123",
  appId: "1:653164789123:web:b9cf33b65c0495ed88cab6",
  measurementId: "G-RQ2TLZXD38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;

