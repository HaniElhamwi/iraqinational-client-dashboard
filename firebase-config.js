import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBCaDEbo_cp7XjIfGfXCl-C5Q98PplNUk",
  authDomain: "food-order-632c5.firebaseapp.com",
  databaseURL: "https://food-order-632c5-default-rtdb.firebaseio.com",
  projectId: "food-order-632c5",
  storageBucket: "food-order-632c5.appspot.com",
  messagingSenderId: "1012582753365",
  appId: "1:1012582753365:web:1666db5d068cd19a0a20dc",
  measurementId: "G-SCBLQQCBK7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
