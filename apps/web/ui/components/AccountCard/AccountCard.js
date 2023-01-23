import React from "react";
import CardContainer from "../CardContainer/CardContainer";
import RoundImage from "../RoundImage/RoundImage";
import styles from "./AccountCard.module.css";
import placeHolder from "../assets/placeholder-profile.jpeg";

function AccountCard({
  name = "Andrea Hallo",
  email = "testtest@test.de",
  image = placeHolder,
}) {
  return (
    <CardContainer>
      <div className={styles.container}>
        <div className={styles.image}>
          <RoundImage alt={name} image={image} initialWidth={100} />
        </div>
        <div className={styles.info}>
          <div>{name || "user name"}</div>
          <div>{email || "email"}</div>
        </div>
      </div>
    </CardContainer>
  );
}

export default AccountCard;
