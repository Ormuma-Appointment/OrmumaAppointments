import styles from "../../ui/page_styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import Button from "../../ui/components/Button/Button";
import OpeningHours from "../../ui/components/OpeningHours/OpeningHours";
import ContactCard from "../../ui/components/ContactCard/ContactCard";
import AddressCard from "../../ui/components/AddressCard/AddressCard";
import calendar from "../../ui/components/assets/calendar_add.svg";
import { BookingContext } from "../../context/BookingContext";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { db } from "../../firebase/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { Parallax } from "react-scroll-parallax";
import { AuthContext } from "../../context/AuthContext";
import { getImages } from "ui/functions/getImages";

export default function Web() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;
  const [storeData, setStoreData] = useState(undefined);
  const { setStoreId, storeId } = useContext(BookingContext);
  const { isAdmin } = useContext(AuthContext);

  async function getData() {
    const q = query(collection(db, "stores"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setStoreId(doc.id);
      setStoreData(doc.data());
    });
    setLoading(false);
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  const [image, setImage] = useState();
  useEffect(() => {
    if (storeId) {
      let requestUrl = `images/stores/${storeId}`;
      getImages(requestUrl).then((resp) => setImage(resp));
    }
  }, [storeId]);

  function handleBookingClick() {
    router.push({
      pathname: "/booking-service",
      query: { storeid: storeId },
    });
  }

  if (!loading) {
    if (storeData) {
      return (
        <div className={styles.container}>
          <Head>
            <title>{storeData.name} | Salounge</title>
            <meta
              name="description"
              content={`Buche deinen nächsten Termin bei ${storeData.name} über Salounge`}
              key="desc"
            />
          </Head>
          <div className={styles.welcome}>
            <div className={styles.header}>
              <h1>Termin buchen bei {storeData.name}</h1>
              {!isAdmin && (
                <Button
                  icon={calendar}
                  size="medium"
                  variant="primary"
                  onClick={handleBookingClick}
                >
                  Termin buchen
                </Button>
              )}
            </div>
            <Parallax translateY={[-30, 10]} className={styles.image_container}>
              {image && (
                <Image
                  alt={storeData.name}
                  src={image}
                  fill
                  className={styles.image}
                />
              )}
            </Parallax>
          </div>
          <div className={styles.info}>
            <h2>Mehr über uns</h2>
            <div className={styles.info_row}>
              <ContactCard
                email={storeData.contact.email}
                telephone={storeData.contact.telephone}
                website={storeData.contact.website}
              />
              <div className="container">
                <OpeningHours hours={storeData.openingHours} />
              </div>
            </div>
            <div className={styles.info_row}>
              <AddressCard
                city={storeData.address.city}
                country={storeData.address.country}
                name={storeData.address.name}
                number={storeData.address.number}
                postalCode={storeData.address.postalCode}
                street={storeData.address.street}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <div>You are wrong here</div>;
    }
  }
}
