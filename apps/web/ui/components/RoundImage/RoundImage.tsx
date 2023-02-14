import React from "react";
import Image from "next/image";
import styles from "./RoundImage.module.css";

interface RoundImageProps {
  alt: string;
  image: string;
  initialWidth: number;
}

const RoundImage: React.FC<RoundImageProps> =({ alt, image, initialWidth })=>{

  return (
    <div className={styles.container}>
      <Image
        src={image}
        alt={alt}
        className={styles.image}
        width={initialWidth}
        height={initialWidth}
      />
    </div>
  );
}

export default RoundImage;
