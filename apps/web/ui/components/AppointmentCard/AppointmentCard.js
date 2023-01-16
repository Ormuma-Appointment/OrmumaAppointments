import React from "react";
import styles from "./AppointmentCard.module.css";
import CardContainer from "../CardContainer/CardContainer";
import Person from "../assets/account.svg";
import Cut from "../assets/scissors.svg";
import Button from "../Button/Button";

function AppointmentCard({ date, time, stylist, customer, service, cancel }) {
  return (
    <CardContainer>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.time}>
            {date} / {time}
          </div>
          {cancel ? (
            <Button icon="" size="xsmall" variant="danger">
              absagen
            </Button>
          ) : (
            <Button icon="" size="xsmall" variant="primary">
              erneut buchen
            </Button>
          )}
        </div>
        <div className={styles.info}>
          <Person className={styles.icon} />
          {stylist && <p>{stylist}</p>}
          {stylist && customer && <>/</>}
          {customer && <p>{customer}</p>}
        </div>
        <div className={styles.info}>
          <Cut className={styles.icon} />
          <p>{service}</p>
        </div>
      </div>
    </CardContainer>
  );
}

export default AppointmentCard;