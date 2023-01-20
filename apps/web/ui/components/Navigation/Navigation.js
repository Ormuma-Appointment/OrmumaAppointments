import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Navigation.module.css";
import logo from "../assets/placeholderLogo.png";
import Logout from "../assets/logout.svg";
import AccountIcon from "../assets/account.svg";
import Calendar from "../assets/calendar.svg";
import Button from "../Button/Button";
import { useAuthContext } from "../../../context/AuthContext";
import { auth } from "../../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";

function Navigation(props) {
  const router = useRouter();

  const { logOut, currentUser } = useAuthContext();
  const {
    customer_logged_out,
    customer_logged_in,
    admin_logged_in,
    admin_logged_out,
    ...rest
  } = props;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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
          src={logo}
          alt="logo"
          className={styles.logoImage}
          height={50}
          width={50}
        />
      </Link>
      {isLoggedIn && (
        <div className={styles.right}>
          {!isAdmin && (
            <>
              <Button
                icon
                size="small"
                variant="secondary"
                onClick={() => router.push("/booking-service")}
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

          <button
            onClick={() =>
              signOut(auth).then(() => {
                router.push("/login");
                console.log("signed out");
                console.log(currentUser);
              })
            }
          >
            <Logout className={styles.icon} />
          </button>
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
