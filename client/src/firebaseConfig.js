// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { firebaseCon } from "./secret";

const firebaseConfig = {
  apiKey: firebaseCon.apiKey || "",
  authDomain: firebaseCon.authDomain || "",
  projectId: firebaseCon.projectId || "",
  storageBucket: firebaseCon.storageBucket || "",
  messagingSenderId: firebaseCon.messagingSenderId || "",
  appId: firebaseCon.appId || "",
  measurementId: firebaseCon.measurementId || "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Initialize Facebook Auth instance
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
