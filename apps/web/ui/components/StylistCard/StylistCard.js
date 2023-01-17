import React from "react";
import styles from "./StylistCard.module.css";
import CardContainer from "../CardContainer/CardContainer";
import RoundImage from "../RoundImage/RoundImage";

function StylistCard({ image, name, text }) {
  return (
    <CardContainer>
      <div className={styles.container}>
        <div className={styles.image}>
          <RoundImage alt={name} image={image} initialWidth={10} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.text}>{text}</div>
        </div>
      </div>
    </CardContainer>
  );
}

export default StylistCard;
