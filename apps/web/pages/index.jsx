import styles from "../ui/page_styles/Home.module.css";
import RoundImage from "../ui/components/RoundImage/RoundImage";
import Button from "../ui/components/Button/Button";
import Logo from "../ui/components/assets/placeholderLogo.png";
import OpeningHours from "../ui/components/OpeningHours/OpeningHours";
import ContactCard from "../ui/components/ContactCard/ContactCard";
import AddressCard from "../ui/components/AddressCard/AddressCard";
import calendar from "../ui/components/assets/calendar_add.svg";
import Link from "next/link";

export default function Web() {
  const contact = {
    email: "naturfriseur@gmail.com",
    telephone: "+49 1577 37384273",
    website: "www.naturfriseur-aachen.de",
  };

  const address = {
    city: "Aachen",
    country: "Deutschland",
    name: "Naturfriseur Aachen",
    number: 11,
    postalCode: "52064",
    street: "Habsburgerallee",
  };

  const openingHours = [
    {
      day: "Monday",
      end: "18:00",
      start: "08:00",
    },
    {
      day: "Tuesday",
      end: "18:00",
      start: "08:00",
    },
    {
      day: "Wednesday",
      end: "18:00",
      start: "08:00",
    },
    {
      day: "Thursday",
      end: "18:00",
      start: "08:00",
    },
    {
      day: "Friday",
      end: "18:00",
      start: "08:00",
    },
    {
      day: "Saturday",
      end: "15:00",
      start: "08:00",
    },
  ];

  function handleBookingClick(e) {
    e.preventDefault();
    console.log("I should go to the booking process");
  }
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
          <Link href="/booking-service">Termin buchen</Link>
        </Button>
      </div>
      <div className={styles.info}>
        <h2>Mehr über uns</h2>
        <div className={styles.info_row}>
          <ContactCard
            email={contact.email}
            telephone={contact.telephone}
            website={contact.website}
          />
          <OpeningHours hours={openingHours} />
        </div>
        <div className={styles.info_row}>
          <AddressCard
            city={address.city}
            country={address.country}
            name={address.name}
            number={address.number}
            postalCode={address.postalCode}
            street={address.street}
          />
        </div>
      </div>
    </div>
  );
}
