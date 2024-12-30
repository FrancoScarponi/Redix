// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4ZXG9cl8VsChql9DWRmqMU3ppygXeQIc",
  authDomain: "redix-8312a.firebaseapp.com",
  projectId: "redix-8312a",
  storageBucket: "redix-8312a.firebasestorage.app",
  messagingSenderId: "841882461735",
  appId: "1:841882461735:web:118e0782afee29eaa11002"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)