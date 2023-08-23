// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAlgW34wHOVgoTitrC244eHZ4Na8Wy-Wgw",
  authDomain: "scanandgo-b5cb2.firebaseapp.com",
  projectId: "scanandgo-b5cb2",
  storageBucket: "scanandgo-b5cb2.appspot.com",
  messagingSenderId: "359255945934",
  appId: "1:359255945934:web:b626b0c53020a38808969f",
  measurementId: "G-FD68KTQLHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

console.log('Firebase Storage Bucket Config:', firebaseConfig.storageBucket);

export {messaging,app, analytics}
