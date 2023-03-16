// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDjHgQ6LFMH05IMgehSdsNg2nJVUJXnURE",
  authDomain: "code-crumbs-8fe58.firebaseapp.com",
  projectId: "code-crumbs-8fe58",
  storageBucket: "code-crumbs-8fe58.appspot.com",
  messagingSenderId: "120688422905",
  appId: "1:120688422905:web:c60325ffa000d000dcd728",
  measurementId: "G-PEPRTCWYY4"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

// Initialize Firebase
const db = getFirestore(app);

export { auth, provider, db };
