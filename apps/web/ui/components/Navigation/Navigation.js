import React from "react";
import Image from "next/image";
import styles from "./Navigation.module.css";
import logo from "../assets/placeholderLogo.png";
import Logout from "../assets/logout.svg";
import AccountIcon from "../assets/account.svg";
import Calendar from "../assets/calendar.svg";

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
        <Image
          src={logo}
          alt="logo"
          className={styles.logoImage}
          height={50}
          width={50}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.buttons}>
          <button> Add Appointment </button>
          <Calendar className={styles.icon} />
          <AccountIcon className={styles.icon} />
          <Logout className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
