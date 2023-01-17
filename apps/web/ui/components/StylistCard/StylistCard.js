import React from "react";
import styles from "./StylistCard.module.css";
import CardContainer from "../CardContainer/CardContainer";
import RoundImage from "../RoundImage/RoundImage";
import placeHolder from "../assets/placeholder-profile.jpeg";

function StylistCard({
  image = placeHolder,
  name = "Sammy Laury",
  text = "Spezialisiert in Balayage und vibrant colors",
}) {
  return (
    <CardContainer>
      <div className={styles.container}>
        <div className={styles.image}>
          <RoundImage alt={name} image={image} initialWidth={10} />
        </div>

        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.text}>{text}</div>
        </div>
      </div>
    </CardContainer>
  );
}

export default StylistCard;
