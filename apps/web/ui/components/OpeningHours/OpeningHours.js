import React from "react";
import styles from "./OpeningHours.module.css";
import CardContainer from "../CardContainer/CardContainer";

function OpeningHours({
  hours = [
    { day: "Monday", start: "08:00", end: "18:00" },
    { day: "Tuesday", start: "08:00", end: "18:00" },
    { day: "Wednesday", start: "08:00", end: "18:00" },
    { day: "Thursday", start: "08:00", end: "18:00" },
    { day: "Friday", start: "08:00", end: "18:00" },
    { day: "Saturday", start: "08:00", end: "15:00" },
  ],
}) {
  console.log(hours);
  return (
    <CardContainer>
      <div className={styles.container}>
        <h3>Öffnungszeiten</h3>
        {hours.map((el, index) => {
          return (
            <div className={styles.day}>
              <p>{el.day}</p>{" "}
              <div>
                <p>{el.start}</p> - <p> {el.end}</p>
              </div>
            </div>
          );
        })}
      </div>
    </CardContainer>
  );
}

export default OpeningHours;
