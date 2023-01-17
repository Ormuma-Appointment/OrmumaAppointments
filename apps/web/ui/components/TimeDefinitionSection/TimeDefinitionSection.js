import React from "react";
import styles from "./TimeDefinitionSection.module.css";
import SelectElement from "../SelectElement/SelectElement";

function TimeDefinitionSection({
  openDays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"],
}) {
  return (
    <div className={styles.container}>
      {openDays.map((el, index) => {
        return (
          <div key={index}>
            <div className={styles.input_group}>
              <p>{el}</p> <SelectElement placeholder="Start" />
              <SelectElement placeholder="Ende" />
              <p>Pause</p> <SelectElement placeholder="Start" />
              <SelectElement placeholder="Ende" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeDefinitionSection;
