import React from "react";
import styles from "../ui/page_styles/Account.module.css";
import Button from "../ui/components/Button/Button";
import calendar from "../ui/components/assets/calendar.svg";
import AccountCard from "../ui/components/AccountCard/AccountCard";

function account() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mein Account</h1>
        <Button icon={calendar} size="medium" variant="primary">
          Termin buchen
        </Button>
      </div>
      <div>
        <h3>Meine Daten</h3>
        <AccountCard className={styles.box}></AccountCard>
      </div>
      <div className={styles.appointments}>
        <div className={styles.appointment_box}>
          <h3>Mein nächster Termin</h3>
          <div className={styles.box}></div>
        </div>
        <div className={styles.appointment_box}>
          <h3>Mein vergangenen Termin(e)</h3>
          <div className={styles.box}></div>
        </div>
      </div>
    </div>
  );
}

export default account;
