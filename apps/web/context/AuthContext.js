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
  const [isAdmin, setIsAdmin] = useState(false);
  const logOut = (a) => {
    signOut(a)
      .then(() => {
        setCurrentUser(null);
        console.log("logged out");
        setIsAdmin(false);
        router.push("/");
      })
      .catch((err) => {
        console.error("erroor");
      });
  };

  // add storeID to context
  const [storeID, setStoreID] = useState(undefined);
  async function getStore() {
    if (currentUser) {
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
  }

  const getUserClaims = async (uid) => {
    const endpoint = `https://us-central1-appointment---web-app.cloudfunctions.net/getUserClaims`;
    const data = { uid };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(endpoint, options);
      const json = await response.json();
      if (json.claims) {
        // Handle success
        if (json.claims.admin) {
          setIsAdmin(true);
        }
      } else {
        // Handle error
        console.log(json.error);
      }
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getStore();
      getUserClaims(currentUser.uid);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggedIn,
        logOut,
        storeID,
        isAdmin,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
