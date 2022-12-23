import React from "react";

import styles from "./SelectItem.module.css";

function SelectItem(props) {
  const { title, price, duration, icon, ...rest } = props;
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
        {icon && (
          <div className={styles.addImage}>
            <img src={icon} alt="add" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectItem;
