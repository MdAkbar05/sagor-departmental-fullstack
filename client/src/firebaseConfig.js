// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { firebaseConfig } from "./secret";

const firebaseConfig = {
  apiKey: firebaseConfig.apiKey || "",
  authDomain: firebaseConfig.authDomain || "",
  projectId: firebaseConfig.projectId || "",
  storageBucket: firebaseConfig.storageBucket || "",
  messagingSenderId: firebaseConfig.messagingSenderId || "",
  appId: firebaseConfig.appId || "",
  measurementId: firebaseConfig.measurementId || "",
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
