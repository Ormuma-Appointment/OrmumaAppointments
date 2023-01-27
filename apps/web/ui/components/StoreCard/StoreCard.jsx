import React from "react";
import Button from "../Button/Button";
import styles from "./StoreCard.module.css";
import Link from "next/link";
import Image from "next/image";
import placeholder from "../assets/salon-placeholder.jpeg";

function StoreCard({ data }) {
  return (
    <div className={`container ${styles.container}`}>
      <Link href={`/h/${data.data.slug}`}>
        <Image
          src={data.data.photo ? data.data.photo : placeholder}
          alt={`Salon: ${data.data.name}`}
        ></Image>
        <div className={styles.store}>
          <h3>{data.data.name}</h3>
          <div className={styles.address}>
            {data.data.address.street}
            {data.data.address.number}, {data.data.address.postalCode}{" "}
            {data.data.address.city}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default StoreCard;
