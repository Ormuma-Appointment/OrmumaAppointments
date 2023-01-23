import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else if (currentUser) {
    }
  }, [router, currentUser]);
  return <>{currentUser ? children : null}</>;
};

export default ProtectedRoutes;
