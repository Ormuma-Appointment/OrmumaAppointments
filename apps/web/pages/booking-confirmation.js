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

  let event = { ...chosen, ...chosenService, ...chosenSlot }; // => have to go to collection events

  /*1. We have to send the event inside collection events
  looking like that 
  events =  [
    {
      category:  "long hair",
      date: Tue Jan 24 2023 00:00:00 GMT+0100,
      duration : 45, 
      employee: "Signe Cervantes",
      end: "11:45",
      price: 2,
      service:"cut",
      slot:['11:00', '11:45'],
      start: "11:00" 
    }
  ]
  2. We have to send the date and the slot inside the employee appointements:
   inside collection employee add something loking like : 
  appointment : {}
  when I have a new event => 
  appointments : {
    date: [[startTime, endTime]]
  }
  if new event at the same date = >
  appointments : {
    date: [[startTime, endTime], [startTime, endTime]]
  }
  if new event at a new date : 
  appointments : {
    date: [[startTime, endTime]], 
    date2: [[startTime, endTime]]
  }

  3. when we are in time for now we have the working time and break time
  check in the appointments if already have an appointment/ several appointement at this date
  if yes then add the slot inside the breakTime
  if no just to like we did before
  }*/

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
