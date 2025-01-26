
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2quF88Ea2OWIjWjQk-z6lSr2yungZ1Os",
  authDomain: "students-fa1f2.firebaseapp.com",
  projectId: "students-fa1f2",
  storageBucket: "students-fa1f2.firebasestorage.app",
  messagingSenderId: "435897867328",
  appId: "1:435897867328:web:f6b73264b70242b99493a5",
  databaseURL: "https://students-fa1f2-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);