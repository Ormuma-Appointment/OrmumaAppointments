import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useRouter } from "next/router";

export const AuthContext = createContext();
//created a context hook that we can import  anywhere

export function useAuthContext() {
  return useContext(AuthContext);
}
export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await (
          await user.getIdTokenResult()
        ).claims.admin;
        setCurrentUser(user);
        console.log(isAdmin);
        setIsAdmin(idTokenResult);
      } // console.log(user);
      setLoading(false);
      return null;
    });

    return () => {
      unsub();
    };
  }, []);

  console.log(currentUser);

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
        console.log("logged out");
        setIsAdmin(false);
        router.push("/");
      })
      .catch((err) => {
        console.error("erroor");
      });
  };

  // add storeId to context
  const [adminStoreId, setAdminStoreId] = useState(undefined);
  const [inStoreSetupProcess, setInStoreSetupProcess] = useState(undefined);
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
      setAdminStoreId(idsTemp[0]);
    }
  }

  useEffect(() => {
    if (currentUser) {
      getStore();
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggedIn,
        logOut,
        adminStoreId,
        isAdmin,
        inStoreSetupProcess,
        setInStoreSetupProcess,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
