import React from "react";
import styles from "./TimeDefinitionSection.module.css";
import SelectElement from "../SelectElement/SelectElement";

function TimeDefinitionSection({ openDays, setTimes }) {
  let start = "start";
  let end = "end";
  let pauseStart = "pausestart";
  let pauseEnd = "pauseend";

  function handleChange(e) {
    let target_name = e.target.name;
    let weekday = target_name.split("_")[0];
    let start_end = target_name.split("_")[1];
    // find which day needs to be updated
    let index;
    if (weekday === "Mo") {
      index = 1;
    } else if (weekday === "Di") {
      index = 2;
    } else if (weekday === "Mi") {
      index = 3;
    } else if (weekday === "Do") {
      index = 4;
    } else if (weekday === "Fr") {
      index = 5;
    } else if (weekday === "Sa") {
      index = 6;
    } else if (weekday === "So") {
      index = 0;
    }

    //find day using index and correct timeslot to paste  selected input in
    setTimes((prev) =>
      prev.map((time) => {
        if (time.day !== index) {
          return time;
        } else if (start_end === "start") {
          return {
            ...time,
            start: e.target.value,
          };
        } else if (start_end === "end") {
          console.log("END");
          return {
            ...time,
            end: e.target.value,
          };
        } else if (start_end === "pausestart") {
          return {
            ...time,
            breakStart: e.target.value,
          };
        } else if (start_end === "pauseend") {
          return {
            ...time,
            breakEnd: e.target.value,
          };
        }
      })
    );
  }

  return (
    <div className={styles.container}>
      {openDays.map((el, index) => {
        return (
          <div key={index}>
            <div className={styles.input_group} onChange={handleChange}>
              <p>{el}</p> <SelectElement time={start} day={el} />
              <SelectElement time={end} day={el} />
              <p>Pause</p> <SelectElement time={pauseStart} day={el} />
              <SelectElement time={pauseEnd} day={el} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeDefinitionSection;
