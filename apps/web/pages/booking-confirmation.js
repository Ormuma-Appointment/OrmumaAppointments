import { useState } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import Link from "next/link";
import Button from "../ui/components/Button/Button";
import AppointmentConfirmation from "../ui/components/AppointmentConfirmation/AppointmentConfirmation";

const BookingConfirmation = () => {
  const [confirmed, setConfirmed] = useState(false);

  const handleBookingConfirmation = () => {
    setConfirmed(!confirmed);
  };

  let service = { style: "style 1", price: "45€", time: "30min" };
  let employee = {
    name: "John",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };
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
              <SelectItem
                title={service.style}
                duration={service.time}
                price={service.price}
              />
              <SelectItem title={employee.name} />
            </div>
            <div className={styles.buttonsContainer}>
              <Button icon="" size="medium" variant="danger">
                <Link href="/booking-calendar">Go back</Link>
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
