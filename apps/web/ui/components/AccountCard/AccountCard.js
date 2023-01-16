import React from "react";
import CardContainer from "../CardContainer/CardContainer";
import styles from "./AccountCard.module.css";
import Edit from "../assets/edit.svg";

function AccountCard({ name = "Andrea Hallo", email = "testtest@test.de" }) {
  return (
    <CardContainer>
      <div className={styles.container}>
        <div className={styles.round}></div>
        <div className={styles.info}>
          <div>{name}</div>
          <div>{email}</div>
        </div>
        <Edit className={styles.icon} />
      </div>
    </CardContainer>
  );
}

export default AccountCard;
