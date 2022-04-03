// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtEzEicyrSNEBfSeMH_DsfPuW1Huf2Bdc",
  authDomain: "firechat-5d635.firebaseapp.com",
  projectId: "firechat-5d635",
  storageBucket: "firechat-5d635.appspot.com",
  messagingSenderId: "1000915124260",
  appId: "1:1000915124260:web:151beec343996f230f18b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
