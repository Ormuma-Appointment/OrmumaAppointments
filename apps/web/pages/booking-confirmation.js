import { useState, useContext } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import Link from "next/link";
import Button from "../ui/components/Button/Button";
import AppointmentConfirmation from "../ui/components/AppointmentConfirmation/AppointmentConfirmation";
import { BookingContext } from "../context/BookingContext";
import { useRouter } from "next/router";

const BookingConfirmation = () => {
  const [confirmed, setConfirmed] = useState(false);

  const { chosenService, chosen, chosenSlot, storeID, slotToString } =
    useContext(BookingContext);

  const handleBookingConfirmation = () => {
    setConfirmed(!confirmed);
  };

  const router = useRouter();

  let event = { ...chosen, ...chosenService, ...chosenSlot };

  console.log("EVENNNT", event);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.center}>Your booking confirmation</h1>
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
