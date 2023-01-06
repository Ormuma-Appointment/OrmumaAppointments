// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnYkXRoEHBhmopmMWJCJv_Su9QVgFaooc",
  authDomain: "appointment---web-app.firebaseapp.com",
  projectId: "appointment---web-app",
  storageBucket: "appointment---web-app.appspot.com",
  messagingSenderId: "812291665581",
  appId: "1:812291665581:web:030a654133bc283fe02024",
  measurementId: "G-1KG4HNXSQD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
