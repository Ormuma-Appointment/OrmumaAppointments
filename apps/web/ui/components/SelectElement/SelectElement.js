import React from "react";
import styles from "./SelectElement.module.css";

function SelectElement({
  minute = [0, 15, 30, 45],
  hour = [
    6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0,
  ],
}) {
  return (
    <>
      {hour ? (
        <select name="hour" id="time" className={styles.input}>
          {hour.map((el, index) => {
            return (
              <option key={index} value={el}>
                {el < 10 ? `0${el}` : `${el}`}
              </option>
            );
          })}
        </select>
      ) : (
        <select name="minute" id="time">
          {minute.map((el, index) => {
            return (
              <option key={index} value={el}>
                {el < 10 ? `0${el}` : `${el}`}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
}

export default SelectElement;
