import React from "react";
import CardContainer from "../CardContainer/CardContainer";
import RoundImage from "../RoundImage/RoundImage";
import styles from "./AccountCard.module.css";
import { useAuthContext } from "../../../context/AuthContext";

function AccountCard({
  name = "Andrea Hallo",
  email = "testtest@test.de",
  image = "/placeholder-profile.jpeg",
}) {
  const { currentUser } = useAuthContext();
  return (
    <CardContainer>
      <div className={styles.container}>
        <div className={styles.image}>
          <RoundImage alt={name} image={image} initialWidth={100} />
        </div>
        <div className={styles.info}>
          <div>{currentUser?.displayName || "user name"}</div>
          <div>{currentUser?.email || "email"}</div>
        </div>
      </div>
    </CardContainer>
  );
}

export default AccountCard;
