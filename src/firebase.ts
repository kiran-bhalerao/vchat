import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrz2WXgqiG-51kVvImSWcKweRmdjIhKfE",
  authDomain: "vchat-3a70a.firebaseapp.com",
  databaseURL: "https://vchat-3a70a.firebaseio.com",
  projectId: "vchat-3a70a",
  storageBucket: "vchat-3a70a.appspot.com",
  messagingSenderId: "506026403648",
  appId: "1:506026403648:web:190e5438515e3b6fe43ca5",
  measurementId: "G-FDGEBV9WFD"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
