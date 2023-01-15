import React from "react";
import styles from "./AppointmentCard.module.css";
import CardContainer from "../CardContainer/CardContainer";
import Person from "../assets/account.svg";

function AppointmentCard() {
  return (
    <CardContainer>
      <div className={styles.container}>
        <div className={styles.header}></div>
        <div className={styles.person}>
          <Person className={styles.icon} />
        </div>
        <div className={styles.service}>
          <Person className={styles.icon} />
        </div>
      </div>
    </CardContainer>
  );
}

export default AppointmentCard;
