import React from "react";
import styles from "./OpeningHours.module.css";
import CardContainer from "../CardContainer/CardContainer";

function OpeningHours(
  openingHours = [
    { day: "Monday", start: "08:00", end: "18:00" },
    { day: "Tuesday", start: "08:00", end: "18:00" },
  ]
) {
  console.log(openingHours);
  return (
    <CardContainer>
      <div className={styles.container}>
        {openingHours.map((el, index) => {
          return (
            <div>
              <p>{el.day}</p>
            </div>
          );
        })}
      </div>
    </CardContainer>
  );
}

export default OpeningHours;
