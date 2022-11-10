import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, setDoc, doc } from "firebase/firestore/lite";
import { ToastAndroid } from "react-native";

import { erroresFirebase } from "../utils/firebaseErrors";
import { getToken } from "../utils/notifications";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        setUserData({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(false);
        setUserData({});
      }
    });
  }, [user]);

  const registerUser = async (email, password, nombre) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await getToken();
      const docRef = doc(db, "users", user.uid);
      const docSpan = await getDoc(docRef);
      if (docSpan.exists()) {
        setUserData({ ...docSpan.data() });
      } else {
        await setDoc(docRef, {
          email: user.email,
          uid: user.uid,
          displayName: nombre,
          photoURL: user.photoURL,
          token: token,
        });
        setUser(true);
        setUserData({
          email: user.email,
          uid: user.uid,
          displayName: nombre,
          photoURL: user.photoURL,
          token: token,
        });
      }
    } catch (error) {
      const { message } = erroresFirebase(error.code);
      ToastAndroid.show(message, ToastAndroid.LONG);
    }
  };

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      ToastAndroid.show("Bienvenido, Sesión Iniciada", ToastAndroid.LONG);
    } catch (error) {
      const { message } = erroresFirebase(error.code);
      ToastAndroid.show(message, ToastAndroid.LONG);
    }
  };

  const signOutUser = () => {
    signOut(auth);
    ToastAndroid.show("Sesión Cerrada", ToastAndroid.LONG);
  };

  const GoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const docRef = doc(db, "users", user.uid);
      const docSpan = await getDoc(docRef);
      if (docSpan.exists()) {
        setUserData({ ...docSpan.data() });
      } else {
        await setDoc(docRef, {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        setUser(true);
        setUserData({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ResetPassword = async () => {
    await sendPasswordResetEmail(auth, auth.currentUser.email);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        signOutUser,
        GoogleSignIn,
        userData,
        setUserData,
        ResetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;

export const UserContext = createContext();
