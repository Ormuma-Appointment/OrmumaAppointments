import React, { useEffect } from "react";
import styles from "./StoreCard.module.css";
import Link from "next/link";
import Image from "next/image";
import placeholder from "../assets/salon-placeholder.jpeg";
import { storage } from "../../../firebase/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function StoreCard({ data }) {
  useEffect(() => {
    const imageLocation = ref(storage, `images/${data.id}`);

    getDownloadURL(ref(imageLocation))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();

        // Or inserted into an <img> element
        const img = document.getElementById("myimg");
        img.setAttribute("src", url);
      })
      .catch((error) => {
        // Handle any errors
      });
  }, []);
  return (
    <div className={`container ${styles.container}`}>
      <Link href={`/h/${data.data.slug}`}>
        <Image src={placeholder} alt={`Salon: ${data.data.name}`}></Image>
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
