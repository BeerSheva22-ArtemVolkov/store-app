// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByFJPgBZsbmUzM8wqT7gUqpN_EP7Hep18",
  authDomain: "store-art96.firebaseapp.com",
  projectId: "store-art96",
  storageBucket: "store-art96.appspot.com",
  messagingSenderId: "847017862920",
  appId: "1:847017862920:web:742ac5a2af75460197eebd"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase