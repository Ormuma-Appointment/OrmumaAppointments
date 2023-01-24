import { useState } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";
import Link from "next/link";
import Button from "../ui/components/Button/Button";
import CalendarContainer from "../ui/components/CalendarContainer/CalendarContainer";
import { useRouter } from "next/router";

const BookingCalendar = () => {
  //const [selectedTime, setSelectedTime] = useState(null);

  //WE HAVE TO FIND A LOGIC HERE - maybe with moment.js

  let service = { style: "style 1", price: "45€", time: "30min" };
  let employee = {
    name: "John",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };

  const router = useRouter();
  const selectedService = router.query;

  console.log("selected service from calendar", selectedService);

  return (
    <div className={styles.pageContainer}>
      <h1>Wähle einen passenden Termin</h1>
      <div className={styles.bookingContainer}>
        <CardContainer>
          <h4>Calendar</h4>
          <CalendarContainer />
        </CardContainer>
        <CardContainer>
          <h4>Ihre Auswahl</h4>
          <div>
            <SelectItem
              service={service.style}
              duration={service.time}
              price={service.price}
            />
            <SelectItem employee={employee.name} />

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
