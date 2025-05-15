import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAyylIa-srqidZrU9dXGrDQGY1bK2fhaO0",
  authDomain: "prismpersonaa.firebaseapp.com",
  databaseURL: "https://prismpersonaa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prismpersonaa",
  storageBucket: "prismpersonaa.appspot.com",
  messagingSenderId: "103707238665",
  appId: "1:103707238665:web:282bc1d83d7f8c045df3d8",
  measurementId: "G-3FCVL6SX6F"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); 