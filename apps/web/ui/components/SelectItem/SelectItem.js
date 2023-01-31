import React from "react";
import styles from "./SelectItem.module.css";
import Plus from "../assets/plus.svg";
import Edit from "../assets/edit.svg";
import Minus from "../assets/minus.svg";

function SelectItem(props) {
  const {
    service,
    employee,
    date,
    minus,
    price,
    duration,
    plus,
    edit,
    selected,
    employeeId,
    ...rest
  } = props;

  const setSelected = props.setSelected;

  const handleSelected = () => {
    if (plus) {
      setSelected({
        service,
        employee,
        price,
        duration,
        employeeId,
      });
    }
  };
  return (
    <div
      className={`${styles.service_container} ${selected && styles.selected}`}
      onClick={handleSelected}
    >
      <div className={styles.serviceName}>
        {service ? service : employee ? employee : date}
      </div>
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
        {minus && (
          <div className={styles.addImage}>
            <Minus />
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectItem;
