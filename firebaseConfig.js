
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnG53dkXRB57BqontNbGZp7MwqDjsKGCk",
  authDomain: "hvac-plumbing-pro-connect.firebaseapp.com",
  projectId: "hvac-plumbing-pro-connect",
  storageBucket: "hvac-plumbing-pro-connect.firebasestorage.app",
  messagingSenderId: "83956914817",
  appId: "1:83956914817:web:9b4944541a718ed9888b80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
