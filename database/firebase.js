import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBU7y3VWdt3YWmqd2IP0arLzNCuseWqUuE",
  authDomain: "proyecto-final-bd246.firebaseapp.com",
  projectId: "proyecto-final-bd246",
  storageBucket: "proyecto-final-bd246.appspot.com",
  messagingSenderId: "707267707028",
  appId: "1:707267707028:web:c24675e69a9ef5ca583481",
  measurementId: "G-E50R9W51QW"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase;