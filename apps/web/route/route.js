import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

export function WithPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuthContext();
    const router = useRouter();
    useEffect(() => {
      if (auth.currentUser) {
        router.push("/account");
      }
    }, []);
    return <Component auth={auth} {...props} />;
  };
}

export function WithAuth(Component) {
  return function WithAuth(props) {
    const auth = useAuthContext();
    const router = useRouter();
    useEffect(() => {
      if (!auth.currentUser) {
        router.push("/login");
      }
    }, []);
    return <Component auth={auth} {...props} />;
  };
}
