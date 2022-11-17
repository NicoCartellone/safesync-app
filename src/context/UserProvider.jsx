import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, setDoc, doc } from "firebase/firestore/lite";

import { erroresFirebase } from "../utils/firebaseErrors";
import { getToken } from "../utils/notifications";

import Toast from "react-native-root-toast";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const getData = await getUserDocument(user);
        if (getData) {
          setUser(true);
          setUserData(getData);
          setLoading(false);
        }
      } else {
        setUser(false);
        setUserData(false);
        setLoading(false);
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
      Toast.show(message);
    }
  };

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show("Bienvenido, Sesión Iniciada");
    } catch (error) {
      const { message } = erroresFirebase(error.code);
      Toast.show(message);
    }
  };

  const signOutUser = () => {
    signOut(auth);
    Toast.show("Sesión Cerrada");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        signOutUser,
        userData,
        setUserData,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;

export const UserContext = createContext();

const getUserDocument = async (user) => {
  if (!user.uid) return null;
  try {
    const docRef = doc(db, "users", user.uid);
    const userDocument = await getDoc(docRef).then((doc) => {
      return doc.data();
    });
    return userDocument;
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
