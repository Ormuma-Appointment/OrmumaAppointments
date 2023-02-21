import React from "react";
import styles from "./AddressCard.module.css";
import Map from "../Map/Map";

interface AddressCardProps {
  name: string;
  street: string;
  number: number;
  postalCode: string;
  city: string;
  country: string;
  telephone: string;
}

const AddressCard: React.FC<AddressCardProps> = ({
  name,
  street,
  number,
  postalCode,
  city,
  country,
  telephone,
  ...rest
}) => {
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.address}>
        <h3>Adresse</h3>
        <ul>
          <li>{name}</li>
          <li>
            {street} {number}
          </li>
          <li>
            {postalCode} {city}
          </li>
          <li>{country}</li>
        </ul>
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
  );
};

export default AddressCard;
