import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyB2tvlLEgfUJt8M_PFWpNpPA6ngrTGkuko",
    authDomain: "safesync-9331d.firebaseapp.com",
    projectId: "safesync-9331d",
    storageBucket: "safesync-9331d.appspot.com",
    messagingSenderId: "528454303879",
    appId: "1:528454303879:web:6f1b2ca6b31d1d46afb822"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
const db = getFirestore(app);

export { auth, db };
