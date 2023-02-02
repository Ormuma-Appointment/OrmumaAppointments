import { useState, useContext } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import Button from "../ui/components/Button/Button";
import AppointmentConfirmation from "../ui/components/AppointmentConfirmation/AppointmentConfirmation";
import { BookingContext } from "../context/BookingContext";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const BookingConfirmation = () => {
  const { chosenService, chosen, chosenSlot, slotToString } =
    useContext(BookingContext);
  const router = useRouter();
  if (chosenSlot) {
  } else {
    router.back();
  }
  const [confirmed, setConfirmed] = useState(false);
  const { currentUser } = useAuthContext();

  let client = {
    clientId: currentUser.uid,
    clientName: currentUser.displayName,
  };

  let event = { ...chosen, ...chosenService, ...chosenSlot, ...client }; // => have to go to collection events

  async function handleBookingConfirmation(e) {
    e.preventDefault();
    setConfirmed(!confirmed);
    const newEventRef = doc(collection(db, "events"));
    await setDoc(newEventRef, event);

    router.push("/booking-confirmation");
  }

  console.log("EVENNNT", event);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.center}>Your booking confirmation</h2>
      {confirmed ? (
        <>
          <AppointmentConfirmation
            employee={event.employee}
            name={event.name}
            start={event.start}
            date={event.date}
          />
          <div className={styles.buttonsContainer}>
            <Button
              icon=""
              size="medium"
              variant="primary"
              onClick={() => router.push("/")}
            >
              Home
            </Button>
            <Button
              icon=""
              size="medium"
              variant="primary"
              onClick={() => router.push("/account")}
            >
              Zum Account
            </Button>
          </div>
        </>
      ) : (
        <div className={`${styles.uniqueContainer}`}>
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
                zurück
              </Button>
              <Button
                icon=""
                size="medium"
                variant="primary"
                onClick={handleBookingConfirmation}
              >
                Buchung bestätigen
              </Button>
            </div>
          </CardContainer>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;
