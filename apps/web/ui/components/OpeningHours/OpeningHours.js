import React from "react";
import styles from "./OpeningHours.module.css";
import CardContainer from "../CardContainer/CardContainer";

function OpeningHours({ hours }) {
  return (
    <CardContainer>
      <div className={styles.container}>
        <h3>Öffnungszeiten</h3>
        {hours.map((el, index) => {
          return (
            <div key={index} className={styles.day}>
              <p>
                {
                  [
                    "Sonntag",
                    "Montag",
                    "Dienstag",
                    "Mittwoch",
                    "Donnerstag",
                    "Freitag",
                    "Samstag",
                  ][el.day]
                }
              </p>{" "}
              <div>
                {el.start ? (
                  <>
                    <p>{el.start}</p> - <p> {el.end}</p>
                  </>
                ) : (
                  <p>geschlossen</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </CardContainer>
  );
}

export default OpeningHours;
