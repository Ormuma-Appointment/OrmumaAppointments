import React from "react";
import styles from "./Navigation.module.css";
import logout from "../assets/logout.svg";
import account from "../assets/account.svg";

function Navigation() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>logoimage</div>
      <div className={styles.right}>
        <div className={styles.links}>
          Calendar
          <img src={account} alt="account" className={styles.icon} />
        </div>
        <div className={styles.buttons}>
          <button> Add Appointment </button>
          <img src={logout} alt="logout" className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
