import React, { useEffect, useState } from "react";
import styles from "./RadioSelectElement.module.css";

function RadioSelectElement({
  labels,
  name,
  setShowServices,
  hasData,
  noSelected,
  setNoSelected,
}) {
  const [localHasData, setLocalHasData] = useState(hasData);

  useEffect(() => {
    setLocalHasData(hasData);

    if (hasData) {
      setShowServices(true);
    } else {
      setShowServices(false);
    }
  }, [hasData]);
  function handleChange(e) {
    let answer = e.target.value;
    if (answer === labels[1]) {
      setShowServices(true);
      setNoSelected(true);
    } else {
      setShowServices(false);
      setNoSelected(false);
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
              checked={noSelected ? index === 1 && true : index === 0 && true}
            />
          </div>
        );
      })}
    </div>
  );
}

export default RadioSelectElement;
