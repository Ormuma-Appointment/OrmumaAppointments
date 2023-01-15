import React, { use, useEffect, useState } from "react";
import styles from "./SelectElement.module.css";
import Down from "../assets/down.svg";

function SelectElement({ minute }) {
  const [data, setData] = useState([0, 2]);
  useEffect(() => {
    if (!minute) {
      setData([
        6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0,
      ]);
    } else {
      setData([0, 15, 30, 45]);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.iconfield}>
        <Down className={styles.icon} />
      </div>
      <select
        name={!minute ? "hour" : "minute"}
        id="time"
        className={styles.input}
      >
        {data.map((el, index) => {
          return (
            <option key={index} value={el}>
              {el < 10 ? `0${el}` : `${el}`}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectElement;
