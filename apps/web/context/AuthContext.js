import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "../firebase/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useRouter } from "next/router";

export const AuthContext = createContext();
//created a context hook that we can import  anywhere

export function useAuthContext() {
  return useContext(AuthContext);
}
export const AuthContextProvider = ({ children }) => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(currentUser);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } // console.log(user);
      return null;
    });

    return () => {
      unsub();
    };
  }, []);

  const isLoggedIn = (currentUser) => {
    if (currentUser) {
      return true;
    }
    return false;
  };

  const logOut = (a) => {
    signOut(a)
      .then(() => {
        setCurrentUser(null);
        console.log("looged out");
        router.push("/");
      })
      .catch((err) => {
        console.error("erroor");
      });
  };

  const [storeID, setStoreID] = useState(undefined);
  async function getStore() {
    let idsTemp = [];
    const querySnapshot = await getDocs(
      collection(db, "users", currentUser.uid, "stores")
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      idsTemp.push(doc.id);
    });
    setStoreID(idsTemp[0]);
  }

  useEffect(() => {
    getStore();
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, logOut, storeID }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
