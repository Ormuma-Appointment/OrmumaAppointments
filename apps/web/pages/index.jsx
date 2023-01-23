import styles from "../ui/page_styles/Home.module.css";
import RoundImage from "../ui/components/RoundImage/RoundImage";
import Button from "../ui/components/Button/Button";
import Logo from "../ui/components/assets/placeholderLogo.png";
import OpeningHours from "../ui/components/OpeningHours/OpeningHours";
import ContactCard from "../ui/components/ContactCard/ContactCard";
import AddressCard from "../ui/components/AddressCard/AddressCard";
import calendar from "../ui/components/assets/calendar_add.svg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Web() {
  const router = useRouter();
  const salon = {
    address: {
      number: "415",
      country: "Deutschland",
      postalCode: "Anim ut voluptatem c",
      city: "Rerum minima id expe",
      street: "Exercitation ipsum ",
    },
    photo: "",
    openingHours: [
      {
        day: 1,
        label: "Mo",
        breakStart: null,
        end: null,
        breakEnd: null,
        start: null,
      },
      {
        breakEnd: null,
        breakStart: null,
        label: "Di",
        day: 2,
        start: null,
        end: null,
      },
      {
        start: null,
        breakStart: null,
        breakEnd: null,
        label: "Mi",
        day: 3,
        end: null,
      },
      {
        breakEnd: "08:00",
        day: 4,
        end: "13:00",
        start: "17:00",
        breakStart: "18:30",
        label: "Do",
      },
      {
        start: "18:30",
        breakEnd: "09:30",
        breakStart: "23:00",
        label: "Fr",
        day: 5,
        end: "16:30",
      },
      {
        label: "Sa",
        start: "20:30",
        day: 6,
        breakEnd: "13:30",
        end: "23:00",
        breakStart: "21:30",
      },
      {
        breakStart: "14:30",
        label: "So",
        day: 0,
        end: "19:30",
        breakEnd: "08:30",
        start: "-",
      },
    ],
    contact: {
      telephone: "+1 (556) 736-2555",
      email: "dummyaddress@test.de",
      website: "https://www.vamilezozyc.tv",
    },
    name: "Odysseus Reynolds",
  };

  const [salonData, setSalonData] = useState(salon);
  async function getData() {
    const docRef = doc(db, "stores", "one");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setSalonData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h1>Wir lieben Natürlichkeit</h1>
        <RoundImage alt="Nice Image" image={Logo} initialWidth={200} />

        <Button
          icon={calendar}
          size="medium"
          variant="primary"
          onClick={() => router.push("/booking-service")}
        >
          Termin buchen
        </Button>
      </div>
      <div className={styles.info}>
        <h2>Mehr über uns</h2>
        <div className={styles.info_row}>
          <ContactCard
            email={salonData.contact.email}
            telephone={salonData.contact.telephone}
            website={salonData.contact.website}
          />
          <OpeningHours hours={salonData.openingHours} />
        </div>
        <div className={styles.info_row}>
          <AddressCard
            city={salonData.address.city}
            country={salonData.address.country}
            name={salonData.address.name}
            number={salonData.address.number}
            postalCode={salonData.address.postalCode}
            street={salonData.address.street}
          />
        </div>
      </div>
    </div>
  );
}
