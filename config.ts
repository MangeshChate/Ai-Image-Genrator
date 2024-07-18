
import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6QFLMrQ4POYAJGcLrDm6i1qHh8VR-1T0",
  authDomain: "vitetypescript.firebaseapp.com",
  databaseURL: "https://vitetypescript-default-rtdb.firebaseio.com",
  projectId: "vitetypescript",
  storageBucket: "vitetypescript.appspot.com",
  messagingSenderId: "987749060987",
  appId: "1:987749060987:web:bbefaf66d18f4d4c67edde",
  measurementId: "G-619KDJ3JPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;