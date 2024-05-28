// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

//Firebase de testes
/*
const firebaseConfig = {
  apiKey: "AIzaSyD5is_Mv6CEdpEl-em52Ejf2AvvNwsUnBU",
  authDomain: "gaia-testedavid.firebaseapp.com",
  projectId: "gaia-testedavid",
  storageBucket: "gaia-testedavid.appspot.com",
  messagingSenderId: "740993891610",
  appId: "1:740993891610:web:0946d344da7103016380a3"
};
*/
//Firebase principal
const firebaseConfig = {
  apiKey: "AIzaSyBOoMVIeUvOm1oKk53lJKCOAgcPCubl16w",
  authDomain: "gaia-a59ea.firebaseapp.com",
  databaseURL: "https://gaia-a59ea-default-rtdb.firebaseio.com",
  projectId: "gaia-a59ea",
  storageBucket: "gaia-a59ea.appspot.com",
  messagingSenderId: "290936162422",
  appId: "1:290936162422:web:9664c4a6cb2409a605b757"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app as FIREBASE_APP, db as FIREBASE_DB, auth as FIREBASE_AUTH };