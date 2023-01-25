import { useState, useContext } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";
import Link from "next/link";
import Button from "../ui/components/Button/Button";
import CalendarContainer from "../ui/components/CalendarContainer/CalendarContainer";
import { BookingContext } from "../context/BookingContext";

const BookingCalendar = () => {
  const { chosenService, chosen } = useContext(BookingContext);

  //const [selectedTime, setSelectedTime] = useState(null);

  //WE HAVE TO FIND A LOGIC HERE - maybe with moment.js

  return (
    <div className={styles.pageContainer}>
      <h1>Unsere calandar</h1>
      <div className={styles.bookingContainer}>
        <CardContainer>
          <h4>Calendar</h4>
          <CalendarContainer />
        </CardContainer>
        <CardContainer>
          <h4>Ihre Auswahl</h4>
          <div>
            <SelectItem
              service={chosenService?.service}
              duration={chosenService?.duration}
              price={chosenService?.price}
            />
            <SelectItem employee={chosen?.employee} />

            <p className={styles.selectItemText}>Select a time</p>
          </div>
          <div className={styles.buttonsContainer}>
            <Button icon="" size="medium" variant="danger">
              <Link href="/booking-employee">Go back</Link>
            </Button>

            <Button icon="" size="medium" variant="primary">
              <Link href="/booking-confirmation">Next step</Link>
            </Button>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default BookingCalendar;
