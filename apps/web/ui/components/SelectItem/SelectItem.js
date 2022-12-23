import React from "react";
import plusIcon from "../assets/plus.svg";
import styles from "./SelectItem.module.css";

function SelectItem(props) {
  const { title, price, duration, plus, ...rest } = props;
  return (
    <div className={styles.service_container}>
      <div className={styles.serviceName}>{title}</div>
      <div className={price ? styles.serviceRight : styles.rightIconOnly}>
        {price && (
          <div className={styles.serviceDetails}>
            <p className={styles.servicePrice}>{price}</p>
            <p className={styles.serviceDuration}>{duration}</p>
          </div>
        )}
        {plus && (
          <div className={styles.addImage}>
            <img src={plusIcon} alt="add" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectItem;
