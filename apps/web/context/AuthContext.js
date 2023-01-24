import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
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

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, logOut }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
