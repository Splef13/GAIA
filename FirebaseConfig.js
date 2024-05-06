import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOoMVIeUvOm1oKk53lJKCOAgcPCubl16w",
    authDomain: "gaia-a59ea.firebaseapp.com",
    databaseURL: "https://gaia-a59ea-default-rtdb.firebaseio.com",
    projectId: "gaia-a59ea",
    storageBucket: "gaia-a59ea.appspot.com",
    messagingSenderId: "290936162422",
    appId: "1:290936162422:web:9664c4a6cb2409a605b757"
  };

// Initialize Firebase App
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firebase Firestore
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Export Firebase Authentication
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);