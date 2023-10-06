// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1waCInh_d_0IzP9Kqvuc_IuRbooGAZe0",
  authDomain: "todo-app-3bf08.firebaseapp.com",
  projectId: "todo-app-3bf08",
  storageBucket: "todo-app-3bf08.appspot.com",
  messagingSenderId: "41066290027",
  appId: "1:41066290027:web:83216bff8ade7ae4c04a2e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
