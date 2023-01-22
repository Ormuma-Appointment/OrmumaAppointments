import React from "react";
import styles from "./StylistCard.module.css";
import CardContainer from "../CardContainer/CardContainer";
import RoundImage from "../RoundImage/RoundImage";
import placeHolder from "../assets/placeholder-profile.jpeg";
import Link from "next/link";

function StylistCard({
  image = placeHolder,
  name,
  description,
  index,
  setEmployeeIndex,
  currentPath,
  ...rest
}) {
  return (
    <CardContainer>
      <Link href={`${currentPath}/#top`} scroll={false}>
        <div
          className={styles.container}
          onClick={() => setEmployeeIndex(index)}
        >
          <div className={styles.image}>
            <RoundImage alt={name} image={image} initialWidth={100} />
          </div>
          <div className={styles.info}>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.text}>{description}</div>
          </div>
        </div>
      </Link>
    </CardContainer>
  );
}

export default StylistCard;
