import React from "react";
import Image from "next/image";
import styles from "./RoundImage.module.css";

function RoundImage({ alt, image, initialWidth }) {
  return (
    <div className={styles.logo}>
      <Image
        src={image}
        alt={alt}
        className={styles.logoImage}
        width={initialWidth ? initialWidth : ""}
        height={initialWidth ? initialWidth : ""}
      />
    </div>
  );
}

export default RoundImage;
