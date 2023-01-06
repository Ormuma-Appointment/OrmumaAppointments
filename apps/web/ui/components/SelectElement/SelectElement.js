import React from "react";
import styles from "./SelectElement.module.css";

function SelectElement({ labels, type }) {
  return (
    <div className={styles.container}>
      {labels.map((el, index) => {
        return (
          <div key={index} className={styles.radio_element}>
            <label htmlFor={el}>{el}</label>
            <input
              type={type}
              id={el}
              name="single"
              value={el}
              className={styles.input}
            />
          </div>
        );
      })}
    </div>
  );
}

export default SelectElement;
