import React from "react";
import styles from "./SelectItem.module.css";
import Plus from "../assets/plus.svg";
import Edit from "../assets/edit.svg";

function SelectItem(props) {
  const { title, price, duration, plus, edit, selected, ...rest } = props;
  return (
    <div
      className={`${styles.service_container} ${selected && styles.selected}`}
    >
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
            <Plus />
          </div>
        )}
        {edit && (
          <div className={styles.addImage}>
            <Edit />
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectItem;
