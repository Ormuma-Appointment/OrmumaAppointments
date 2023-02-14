import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Navigation.module.css";
import Logout from "../assets/logout.svg";
import AccountIcon from "../assets/account.svg";
import Button from "../Button/Button";
import { useAuthContext } from "../../../context/AuthContext";
import { auth } from "../../../firebase/firebase";

import { useRouter } from "next/router";
import Link from "next/link";

function Navigation() {
  const router = useRouter();

  const { currentUser, isAdmin, adminStoreId, logOut } = useAuthContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo.png"
          alt="logo"
          className={styles.logoImage}
          height={50}
          width={50}
        />
      </Link>
      {isLoggedIn && (
        <div className={styles.right}>
          {isAdmin && (
            <>
              <Button
                icon
                size="small"
                variant="secondary"
                onClick={() =>
                  router.push({
                    pathname: "/booking-service",
                    query: {
                      storeid: adminStoreId,
                    },
                  })
                }
              >
                Termin buchen
              </Button>
            </>
          )}
          {isAdmin ? (
            <AccountIcon
              className={styles.icon}
              onClick={() => router.push("/account-admin")}
            />
          ) : (
            <AccountIcon
              className={styles.icon}
              onClick={() => router.push("/account")}
            />
          )}

          <Logout
            className={styles.icon}
            onClick={() => {
              logOut(auth);
              router.push("/login");
            }}
          />
        </div>
      )}

      {!isLoggedIn && (
        <div className={styles.loggedOut}>
          <Button
            size="small"
            variant="invisible"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          {!isAdmin && (
            <Button
              size="small"
              variant="secondary"
              onClick={() => router.push("/register")}
            >
              Registrieren
            </Button>
          )}
          {isAdmin && (
            <>
              <Button
                size="small"
                variant="invisible"
                onClick={() => router.push("/login-admin")}
              >
                Login
              </Button>
              <Button
                size="small"
                variant="secondary"
                onClick={() => router.push("/register-admin")}
              >
                Salon Registrieren
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navigation;
