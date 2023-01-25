import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const AdminProtectedRoutes = ({ children }) => {
  const { currentUser, isAdmin } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // if (!currentUser && !isAdmin) {
    //   router.push("/login");
    if (currentUser && !isAdmin) {
      router.push("/account");
    }
  }, [router, currentUser, isAdmin]);
  return <>{currentUser && isAdmin ? children : null}</>;
};

export default AdminProtectedRoutes;
