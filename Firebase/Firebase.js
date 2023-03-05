// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAaBse7bI0yD_-usK9ed9tfvnG65ncRyH4",
  authDomain: "code-crumbs.firebaseapp.com",
  projectId: "code-crumbs",
  storageBucket: "code-crumbs.appspot.com",
  messagingSenderId: "202918254414",
  appId: "1:202918254414:web:752dafd2ae86953a1ff01f",
  measurementId: "G-J1PG6FYNS6"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

// Initialize Firebase
const db = getFirestore(app);

export { auth, provider, db };
