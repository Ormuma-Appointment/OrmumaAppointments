import React, { useEffect } from "react";
import styles from "./RadioSelectElement.module.css";

interface RadioSelectElementProps {
  labels: string[];
  name: string;
  hasData: boolean;
  noSelected: boolean;
  setShowServices: React.Dispatch<React.SetStateAction<boolean>>;
  setNoSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const RadioSelectElement: React.FC<RadioSelectElementProps> = ({
  labels,
  name,
  hasData,
  noSelected,
  setShowServices,
  setNoSelected,
}) => {
  useEffect(() => {
    if (hasData) {
      setShowServices(true);
    } else {
      setShowServices(false);
    }
  }, [hasData, setShowServices]);

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
      {labels.map((el: string, index: number) => {
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
              onChange={() => {}}
              checked={noSelected ? index === 1 && true : index === 0 && true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RadioSelectElement;
