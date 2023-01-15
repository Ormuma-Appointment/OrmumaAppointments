import React from "react";
import styles from "./TimeDefinitionSeciton.module.css";

function TimeDefinitionSeciton({
  openDays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"],
}) {
  return (
    <div className={styles.container}>
      {openDays.map((el, index) => {
        return <div key={index}>{el} </div>;
      })}
    </div>
  );
}

export default TimeDefinitionSeciton;
