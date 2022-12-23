import React from "react";
import plus from "../assets/plus.svg";
import styles from "./SelectItem.module.css";

function SelectItem(props) {
  const {
    name = "Waschen, Schneiden, Stylen",
    price = "59,00 €",
    duration = "45 mins",
    ...rest
  } = props;
  return (
    <div className={styles.service_container}>
      <div className={styles.serviceName}>{name}</div>
      <div className={styles.serviceRight}>
        <div className={styles.serviceDetails}>
          <p className={styles.servicePrice}>{price}</p>
          <p className={styles.serviceDuration}>{duration}</p>
        </div>
        <div className={styles.addImage}>
          <img src={plus} alt="add" />
        </div>
      </div>
    </div>
  );
}

export default SelectItem;
