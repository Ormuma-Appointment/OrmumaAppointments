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
  const router = useRouter();
  const selectedItems = router.query;

  console.log("selected items from calendar", selectedItems);

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
              service={selectedItems.service}
              duration={selectedItems.duration}
              price={selectedItems.price}
            />
            <SelectItem employee={selectedItems.employee} />

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
