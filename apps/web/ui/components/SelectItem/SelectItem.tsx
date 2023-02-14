import React from "react";
import styles from "./SelectItem.module.css";
import Plus from "../assets/plus.svg";
import Edit from "../assets/edit.svg";
import Minus from "../assets/minus.svg";

interface SelectItemProps {
  service: string | undefined; //
  employee: string | undefined; // 
  date: string | undefined; // 
  price: number | undefined; //
  duration: number | undefined; // 
  minus: boolean | undefined; //
  plus: boolean | undefined; // 
  edit: boolean | undefined; // 
  employeeId: string | undefined; // 
  storeId: string | undefined;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<{
    employee: string | undefined;
    employeeId: string | undefined;
    storeId: string | undefined;
    service: string | undefined;
    price: number | undefined;
    duration: number | undefined;
  }>>
  ;
}

const SelectItem: React.FC<SelectItemProps> = ({
  service,
  employee,
  date,
  minus,
  price,
  duration,
  plus,
  edit,
  employeeId,
  setSelected,
  storeId}) => {
 
  const handleSelected = () => {
    if (plus) {
      setSelected({
        service,
        employee,
        price,
        duration,
        employeeId,
        storeId,
      });
    }
  };
  return (
    <div
      className={styles.service_container}
      onClick={handleSelected}
    >
      <div className={styles.serviceName}>
        {service ? service : employee ? employee : date}
      </div>
      <div className={price ? styles.serviceRight : styles.rightIconOnly}>
        {price && (
          <div className={styles.serviceDetails}>
            <p className={styles.servicePrice}>{price} €</p>
            <p className={styles.serviceDuration}>{duration} mins</p>
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
