import React, { useEffect, useState } from "react";
import styles from "./StylistCard.module.css";
import CardContainer from "../CardContainer/CardContainer";
import RoundImage from "../RoundImage/RoundImage";
import Link from "next/link";
import { useRouter } from "next/router";
import { storage } from "../../../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";

function StylistCard({
  image = "/placeholder-profile.jpeg",
  name,
  description,
  index,
  setEmployeeIndex,
  id,
  isClickable,
}) {
  const router = useRouter();
  const [currentPathA] = useState(router.pathname);
  const [imageShown, setImageShown] = useState(image);
  useEffect(() => {
    if (id) {
      const imageLocation = ref(storage, `images/team/${id}`);

      getDownloadURL(ref(imageLocation))
        .then((url) => {
          setImageShown(url);
        })
        .catch((error) => {
          // Handle any errors
        });
    }
  }, [id]);
  console.log("employee clickable", isClickable);

  return (
    <CardContainer>
      <Link href={`${currentPathA}/#top`} scroll={false}>
        <div
          className={styles.container}
          onClick={() => setEmployeeIndex(index)}
        >
          <div className={styles.image}>
            <RoundImage alt={name} image={imageShown} initialWidth={100} />
          </div>
          <div className={styles.info}>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.text}>{description}</div>
          </div>
        </div>
      </Link>
    </CardContainer>
  );
}

export default StylistCard;