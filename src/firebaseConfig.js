// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsIn2YuuU-O0xLq7VYVRl5u8RlBX6X7RM",
  authDomain: "game-gauntlet.firebaseapp.com",
  projectId: "game-gauntlet",
  storageBucket: "game-gauntlet.firebasestorage.app",
  messagingSenderId: "1026674611799",
  appId: "1:1026674611799:web:070f93ac0ae599be443512"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app)

// Export the Firestore instance
export { db }