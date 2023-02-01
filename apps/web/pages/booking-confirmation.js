import { useState, useContext } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import Link from "next/link";
import Button from "../ui/components/Button/Button";
import AppointmentConfirmation from "../ui/components/AppointmentConfirmation/AppointmentConfirmation";
import { BookingContext } from "../context/BookingContext";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const BookingConfirmation = () => {
  const { chosenService, chosen, chosenSlot, storeID, slotToString } =
    useContext(BookingContext);
  const router = useRouter();
  if (chosenSlot) {
  } else {
    router.back();
  }
  const [confirmed, setConfirmed] = useState(false);
  const { currentUser } = useAuthContext();

  let user = {
    id: currentUser.uid,
    name: currentUser.displayName,
  };

  let event = { ...chosen, ...chosenService, ...chosenSlot, ...user }; // => have to go to collection events

  async function handleBookingConfirmation(e) {
    e.preventDefault();
    setConfirmed(!confirmed);
    const newEventRef = doc(collection(db, "events"));
    await setDoc(newEventRef, event);
  }
  console.log("chosenService", chosenService);
  console.log("EVENNNT", event);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.center}>Your booking confirmation</h2>
      {confirmed ? (
        <>
          <AppointmentConfirmation />
          <div className={styles.buttonsContainer}>
            <Button icon="" size="medium" variant="danger">
              <Link
                href="/booking-confirmation"
                onClick={handleBookingConfirmation}
              >
                Cancel
              </Link>
            </Button>
            <Button icon="" size="medium" variant="primary">
              <Link href="/">Home</Link>
            </Button>
            <Button icon="" size="medium" variant="primary">
              <Link href="/account">My account</Link>
            </Button>
          </div>
        </>
      ) : (
        <div className={`${styles.bookingContainer} ${styles.uniqueContainer}`}>
          <CardContainer>
            {" "}
            <h4>Ihre Auswahl</h4>
            <div>
              {chosenService && (
                <SelectItem
                  service={chosenService.service}
                  duration={chosenService.duration}
                  price={chosenService.price}
                />
              )}

              {chosen && <SelectItem employee={chosen.employee} />}
              {chosenSlot && <SelectItem date={slotToString} />}
            </div>
            <div className={styles.buttonsContainer}>
              <Button
                onClick={() => router.back()}
                icon=""
                size="medium"
                variant="danger"
              >
                Go back
              </Button>
              <Button icon="" size="medium" variant="primary">
                <Link
                  href="/booking-confirmation"
                  onClick={handleBookingConfirmation}
                >
                  Confirm
                </Link>
              </Button>
            </div>
          </CardContainer>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;
