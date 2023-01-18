import React from "react";
import styles from "./StylistCard.module.css";
import CardContainer from "../CardContainer/CardContainer";
import RoundImage from "../RoundImage/RoundImage";
import placeHolder from "../assets/placeholder-profile.jpeg";

function StylistCard({ image = placeHolder, name, description }) {
  return (
    <CardContainer>
      <div className={styles.container}>
        <div className={styles.image}>
          <RoundImage alt={name} image={image} initialWidth={100} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.text}>{description}</div>
        </div>
      </div>
    </CardContainer>
  );
}

export default StylistCard;
