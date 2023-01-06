import React from "react";
import styles from "./SelectElement.module.css";

function SelectElement({ labels, multiselect }) {
  return (
    <div className={styles.container}>
      {labels.map((el, index) => {
        return (
          <div key={index} className={styles.radio_element}>
            <label for={el}>{el}</label>
            <input
              type="checkbox"
              id={el}
              name={multiselect ? `${el}` : "single"}
              value={el}
            />
          </div>
        );
      })}
    </div>
  );
}

export default SelectElement;
