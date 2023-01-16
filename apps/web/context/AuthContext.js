import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";

export const AuthContext = createContext();
//created a context hook that we can import  anywhere
export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      //   console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
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
    <AuthContext.Provider value={{ currentUser, register, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
