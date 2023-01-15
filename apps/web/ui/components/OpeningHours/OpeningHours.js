import React from "react";
import styles from "./OpeningHours.module.css";
import CardContainer from "../CardContainer/CardContainer";

function OpeningHours({ hours }) {
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
