import React from "react";
import styles from "./Navigation.module.css";
import logout from "../assets/logout.svg";
import account from "../assets/account.svg";
import calendar from "../assets/calendar.svg";
import logo from "../assets/placeholderLogo.png";

function Navigation(props) {
  const {
    addAppointment,
    calendar,
    account,
    login,
    logout,
    createAccount,
    ...rest
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" className={styles.logoImage} />
      </div>
      <div className={styles.right}>
        <div className={styles.buttons}>
          <button> Add Appointment </button>
          <img src={calendar} alt="calendar" className={styles.icon} />
          <img src={account} alt="account" className={styles.icon} />
          <img src={logout} alt="logout" className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
