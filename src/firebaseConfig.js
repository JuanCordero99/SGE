// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, initializeAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT8tBXo_t34VUMAxYvN-c1w1dYnxI71to",
  authDomain: "practia10web5to.firebaseapp.com",
  databaseURL: "https://practia10web5to-default-rtdb.firebaseio.com",
  projectId: "practia10web5to",
  storageBucket: "practia10web5to.firebasestorage.app",
  messagingSenderId: "611254798930",
  appId: "1:611254798930:web:8f5fea652c26944b37ed8b",
  measurementId: "G-FNP0RKYQCK"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googlProvider = new googlProvider(); 

export default app;