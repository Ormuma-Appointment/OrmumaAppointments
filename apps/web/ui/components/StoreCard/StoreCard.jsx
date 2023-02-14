import React, { useEffect, useState } from "react";
import styles from "./StoreCard.module.css";
import Link from "next/link";
import Image from "next/image";
import { getImages } from "../../functions/getImages";

function StoreCard({ data }) {
  const [image, setImage] = useState();

  useEffect(() => {
    let requestUrl = `images/stores/${data.id}`;
    getImages(requestUrl).then((resp) => setImage(resp));
  }, [data]);

  return (
    <div className={`container ${styles.container}`}>
      <Link href={`/h/${data.data.slug}`}>
        <div className={styles.image}>
          {image && (
            <Image
              src={image}
              alt={`Salon: ${data.data.name}`}
              layout="fill"
              width={600}
              height={300}
              priority
            />
          )}
        </div>
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
