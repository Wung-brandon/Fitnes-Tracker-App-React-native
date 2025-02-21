// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE1nwi8gnVt_hMz7TlEwVjXwYF_0lslO4",
  authDomain: "fitness-tracker-441f4.firebaseapp.com",
  projectId: "fitness-tracker-441f4",
  storageBucket: "fitness-tracker-441f4.firebasestorage.app",
  messagingSenderId: "675708816202",
  appId: "1:675708816202:web:be7598738d94f6dfb68fb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };