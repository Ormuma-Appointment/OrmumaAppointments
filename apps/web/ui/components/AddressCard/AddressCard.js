import React from "react";
import styles from "./AddressCard.module.css";
import CardContainer from "../CardContainer/CardContainer";
import Map from "../Map/Map";

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
          <h3>Adresse</h3>
          <br />
          <b>{name}</b>
          <br />
          {street} {number}
          <br />
          {postalCode} {city}
          <br />
          {country}
          <br />
          Telefon: {telephone}
        </div>
        <div className={styles.map}>
          <Map
            name={name}
            street={street}
            number={number}
            postalCode={postalCode}
            city={city}
            country={country}
          />
        </div>
      </div>
    </CardContainer>
  );
}

export default AddressCard;
