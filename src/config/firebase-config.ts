import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyByFJPgBZsbmUzM8wqT7gUqpN_EP7Hep18",
  authDomain: "store-art96.firebaseapp.com",
  projectId: "store-art96",
  storageBucket: "store-art96.appspot.com",
  messagingSenderId: "847017862920",
  appId: "1:847017862920:web:742ac5a2af75460197eebd"
};

export const appFirebase = initializeApp(firebaseConfig);
export const storageFirebase = getStorage(appFirebase)