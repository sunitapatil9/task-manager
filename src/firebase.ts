// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1C-voG9o5h6p_D8A8G4KTckIelt0Ajks",
  authDomain: "taskmanagervue-fa3c2.firebaseapp.com",
  projectId: "taskmanagervue-fa3c2",
  storageBucket: "taskmanagervue-fa3c2.firebasestorage.app",
  messagingSenderId: "583824192705",
  appId: "1:583824192705:web:0d00e3276c697ea904d040",
  measurementId: "G-B7CNHN5HFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth}
