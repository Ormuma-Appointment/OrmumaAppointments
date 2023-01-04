import React from "react";
import Image from "next/image";
import styles from "./Navigation.module.css";
import logo from "../assets/placeholderLogo.png";
import Logout from "../assets/logout.svg";
import AccountIcon from "../assets/account.svg";
import Calendar from "../assets/calendar.svg";
import Button from "../Button/Button";

function Navigation(props) {
  const {
    customer_logged_out,
    customer_logged_in,
    admin_logged_in,
    admin_logged_out,
    ...rest
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src={logo}
          alt="logo"
          className={styles.logoImage}
          height={50}
          width={50}
        />
      </div>
      {(admin_logged_in || customer_logged_in) && (
        <div className={styles.right}>
          {admin_logged_in && (
            <>
              <Button icon size="small" variant="secondary">
                Termin buchen
              </Button>
              <Calendar className={styles.icon} />
            </>
          )}
          <AccountIcon className={styles.icon} />
          <Logout className={styles.icon} />
        </div>
      )}

      {(customer_logged_out || admin_logged_out) && (
        <div className={styles.loggedOut}>
          <button>Login</button>
          {customer_logged_out && <button>Registrieren</button>}
          {admin_logged_out && <button>Salon Registrieren</button>}
        </div>
      )}
    </div>
  );
}

export default Navigation;
