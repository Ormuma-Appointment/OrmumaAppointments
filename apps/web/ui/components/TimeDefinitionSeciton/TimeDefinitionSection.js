import React from "react";
import styles from "./TimeDefinitionSection.module.css";
import Input from "../InputField/Input";

function TimeDefinitionSection({
  openDays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"],
}) {
  return (
    <div className={styles.container}>
      {openDays.map((el, index) => {
        return (
          <div key={index}>
            <div className={styles.input_group}>
              {el} <Input placeholder="Start" /> <Input placeholder="Ende" />
            </div>
            <div className={styles.input_group}>
              Pause <Input placeholder="Start" /> <Input placeholder="Ende" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeDefinitionSection;
