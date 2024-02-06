import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDujo7K2R3PP27i8Ow_uX7oaUIKlMruySs",
  authDomain: "adopta-un-dog.firebaseapp.com",
  projectId: "adopta-un-dog",
  storageBucket: "adopta-un-dog.appspot.com",
  messagingSenderId: "636137700223",
  appId: "1:636137700223:web:3e14c52b283b806c67b84a",
  measurementId: "G-CNFTXW02LL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };