 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4D4yKOQH3gOZzNLntpTxXHcwGqwnYcs4",
  authDomain: "tecnotraducaobr.firebaseapp.com",
  projectId: "tecnotraducaobr",
  storageBucket: "tecnotraducaobr.firebasestorage.app",
  messagingSenderId: "963796781337",
  appId: "1:963796781337:web:63c55e906d2fcfe0f4dd88",
  measurementId: "G-9FRK9BRS3G"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

