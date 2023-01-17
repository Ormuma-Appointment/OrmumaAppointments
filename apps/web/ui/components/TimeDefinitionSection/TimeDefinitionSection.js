import React from "react";
import styles from "./TimeDefinitionSection.module.css";
import SelectElement from "../SelectElement/SelectElement";

function TimeDefinitionSection({ openDays, setTimes }) {
  function handleChange(e) {
    console.log(e.target.name);
  }
  return (
    <div className={styles.container}>
      {openDays.map((el, index) => {
        return (
          <div key={index}>
            <div className={styles.input_group} onChange={handleChange}>
              <p>{el}</p> <SelectElement placeholder="Start" day={el} />
              <SelectElement placeholder="Ende" day={el} />
              <p>Pause</p> <SelectElement placeholder="Start" day={el} />
              <SelectElement placeholder="Ende" day={el} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeDefinitionSection;
