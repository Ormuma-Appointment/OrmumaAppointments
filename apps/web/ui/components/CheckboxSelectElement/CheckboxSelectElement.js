import React from "react";
import styles from "./CheckboxSelectElement.module.css";

function CheckboxSelectElement({ labels, setOpenDays, openDays, hasData }) {
  function handleChange(e) {
    let current = e.target.value;
    if (openDays.includes(current)) {
      setOpenDays((prev) => prev.filter((el) => el !== current));
    } else {
      setOpenDays((prev) => [...prev, current]);
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
              type="checkbox"
              id={el}
              value={el}
              name={el}
              className={styles.input}
              checked={hasData ? "checked" : ""}
              onChange={(e) => {}}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CheckboxSelectElement;
