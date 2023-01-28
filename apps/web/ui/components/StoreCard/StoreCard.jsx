import React, { useEffect, useState } from "react";
import styles from "./StoreCard.module.css";
import Link from "next/link";
import Image from "next/image";
import { storage } from "../../../firebase/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function StoreCard({ data }) {
  const [image, setImage] = useState();
  useEffect(() => {
    const imageLocation = ref(storage, `images/${data.id}`);

    getDownloadURL(ref(imageLocation))
      .then((url) => {
        console.log(url);
        setImage(url);
      })
      .catch((error) => {
        // Handle any errors
      });
  }, []);
  return (
    <div className={`container ${styles.container}`}>
      <Link href={`/h/${data.data.slug}`}>
        <Image
          src={image ? image : "/salon-placeholder.jpeg"}
          alt={`Salon: ${data.data.name}`}
          width={80}
          height={80}
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
