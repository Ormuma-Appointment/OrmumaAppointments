import React from "react";
import styles from "./RadioSelectElement.module.css";

function RadioSelectElement({ labels, name, setShowServices }) {
  function handleChange(e) {
    let answer = e.target.value;
    if (answer === labels[1]) {
      setShowServices(true);
    } else {
      setShowServices(false);
    }
  }
  return (
    <div className={styles.container}>
      {labels.map((el, index) => {
        return (
          <div
            key={index}
            className={styles.radio_element}
            onChange={handleChange}
          >
            <label htmlFor={el}>{el}</label>
            <input
              type="radio"
              id={el}
              value={el}
              name={name}
              className={styles.input}
            />
          </div>
        );
      })}
    </div>
  );
}

export default RadioSelectElement;
