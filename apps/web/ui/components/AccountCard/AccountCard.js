import React from "react";
import CardContainer from "../CardContainer/CardContainer";
import styles from "./AccountCard.module.css";
import Edit from "../assets/edit.svg";
import { useAuthContext } from "../../../context/AuthContext";

function AccountCard({ name = "Andrea Hallo", email = "testtest@test.de" }) {
  const { currentUser, userData } = useAuthContext();
  return (
    <CardContainer>
      <div className={styles.container}>
        <div className={styles.round}></div>
        <div className={styles.info}>
          <div>{currentUser?.displayName || "undefined"}</div>
          <div>{currentUser?.email}</div>
        </div>
        <Edit className={styles.icon} />
      </div>
    </CardContainer>
  );
}

export default AccountCard;
