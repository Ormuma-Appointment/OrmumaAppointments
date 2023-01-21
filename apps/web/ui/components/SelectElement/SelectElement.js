import React, { useEffect, useState } from "react";
import styles from "./SelectElement.module.css";

function SelectElement({ day, time, value }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const [data] = useState([
    "-",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
    "00:00",
  ]);

  return (
    <div className={styles.container}>
      <select
        name={`${day}_${time}`}
        id="time"
        className={styles.input}
        value={localValue}
        onChange={(e) => setLocalValue((prev) => e.target.value)}
      >
        {data.map((el, index) => {
          return (
            <option key={index} value={el}>
              {el}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectElement;
