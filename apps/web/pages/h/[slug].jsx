import styles from "../../ui/page_styles/Home.module.css";
import RoundImage from "../../ui/components/RoundImage/RoundImage";
import Button from "../../ui/components/Button/Button";
import Logo from "../../ui/components/assets/placeholderLogo.png";
import OpeningHours from "../../ui/components/OpeningHours/OpeningHours";
import ContactCard from "../../ui/components/ContactCard/ContactCard";
import AddressCard from "../../ui/components/AddressCard/AddressCard";
import calendar from "../../ui/components/assets/calendar_add.svg";
import { BookingContext } from "../../context/BookingContext";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { db } from "../../firebase/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

export default function Web() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;
  const [storeData, setStoreData] = useState(undefined);
  const { setStoreID, storeID } = useContext(BookingContext);

  async function getData() {
    const q = query(collection(db, "stores"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setStoreID(doc.id);
      setStoreData(doc.data());
    });
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  function handleBookingClick() {
    if (storeID) {
      router.push({
        pathname: "/booking-service",
        query: { storeid: storeID },
      });
    } else {
      router.push("/booking-service");
    }
  }

  if (!loading) {
    if (storeData) {
      return (
        <div className={styles.container}>
          <div className={styles.welcome}>
            <h1>Wir lieben Natürlichkeit</h1>
            <RoundImage alt="Nice Image" image={Logo} initialWidth={200} />

            <Button
              icon={calendar}
              size="medium"
              variant="primary"
              onClick={handleBookingClick}
            >
              Termin buchen
            </Button>
          </div>
          <div className={styles.info}>
            <h2>Mehr über uns</h2>
            <div className={styles.info_row}>
              <ContactCard
                email={storeData.contact.email}
                telephone={storeData.contact.telephone}
                website={storeData.contact.website}
              />
              <OpeningHours hours={storeData.openingHours} />
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
