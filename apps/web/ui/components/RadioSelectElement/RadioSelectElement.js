import React from "react";
import styles from "./RadioSelectElement.module.css";

function RadioSelectElement({ labels }) {
  return (
    <div className={styles.container}>
      {labels.map((el, index) => {
        return (
          <div key={index} className={styles.radio_element}>
            <label htmlFor={el}>{el}</label>
            <input type="radio" id={el} value={el} className={styles.input} />
          </div>
        );
      })}
    </div>
  );
}

export default RadioSelectElement;
