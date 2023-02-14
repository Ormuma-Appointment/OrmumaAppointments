import React, { useEffect, useState } from "react";
import styles from "./StylistCard.module.css";
import CardContainer from "../CardContainer/CardContainer";
import RoundImage from "../RoundImage/RoundImage";
import Link from "next/link";
import { useRouter } from "next/router";
import { getImages } from "../../functions/getImages";

interface StylistCardProps {
  image: string | undefined;
  name: string;
  description: string | undefined;
  index: number;
  setEmployeeIndex: React.Dispatch<React.SetStateAction<number>>;
  id: string;
  isClickable: boolean;
}
const StylistCard: React.FC<StylistCardProps> = ({
  image = "/placeholder-profile.jpeg",
  name,
  description,
  index,
  setEmployeeIndex,
  id,
  isClickable,
}) => {
  const router = useRouter();
  const [currentPath] = useState(router.pathname);
  const [imageShown, setImageShown] = useState(image);

  useEffect(() => {
    if (id) {
      let requestUrl = `images/team/${id}`
      getImages(requestUrl).then((resp) => setImageShown(resp));
    }
  }, [id]);

  return (
    <CardContainer>
      <Link href={`${currentPath}/#top`} scroll={false}>
        <div
          className={styles.container}
          onClick={() => isClickable && setEmployeeIndex(index)}
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
