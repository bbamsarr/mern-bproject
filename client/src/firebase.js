// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-bproject.firebaseapp.com",
  projectId: "mern-bproject",
  storageBucket: "mern-bproject.appspot.com",
  messagingSenderId: "390354682457",
  appId: "1:390354682457:web:466debaf1b34f1aa9ce748"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);