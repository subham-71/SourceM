import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const fire = firebase.initializeApp({
    apiKey: "AIzaSyACn0N4iCLgUwiEDZjLlSjcxqiG6fi7GNo",
    //authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    authDomain: "sourcem-8e7e3.firebaseapp.com",
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    projectId: "sourcem-8e7e3",
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    storageBucket: "sourcem-8e7e3.appspot.com" ,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    messagingSenderId: 339415919522,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
    appId: "1:339415919522:web:f93de2ef1845abb6bbe0fb",
    // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    measurementId: "G-4K9ECBLCVM"
})

export const auth = fire.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export default fire