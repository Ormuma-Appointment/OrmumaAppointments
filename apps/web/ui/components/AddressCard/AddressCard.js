import React from "react";
import styles from "./AddressCard.module.css";
import CardContainer from "../CardContainer/CardContainer";

function AddressCard(props) {
  const {
    name = "Naturfriseur Aachen",
    street = "Habsburgerallee",
    number = 11,
    postalCode = "52064",
    city = "Aachen",
    country = "Deutschland",
    telephone = "0241 / 70 98 99",
    ...rest
  } = props;
  return (
    <CardContainer>
      <div className={styles.container}>
        <div className={styles.address}>
          Adresse
          <br />
          <b>{name}</b>
          <br />
          {street} {number}
          <br />
          {postalCode} {city}
          <br />
          {country}
          <br />
          {telephone}
        </div>
        <div className={styles.map}>
          <div></div>
        </div>
      </div>
    </CardContainer>
  );
}

export default AddressCard;
