import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAH-mUHmtU0vtCrM-upb_qV_kHXEDoSc1I",
  authDomain: "bouncecode-hexa.firebaseapp.com",
  databaseURL: "https://bouncecode-hexa.firebaseio.com",
  projectId: "bouncecode-hexa",
  storageBucket: "bouncecode-hexa.appspot.com",
  messagingSenderId: "1039921304405",
  appId: "1:1039921304405:web:72b494b44af7c162d315dc",
  measurementId: "G-QQB3BS1EH4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebaseApp.firestore();

export default firebaseApp;
