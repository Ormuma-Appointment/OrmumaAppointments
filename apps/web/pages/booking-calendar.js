import { useState, useContext, useEffect } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import SelectionCard from "../ui/components/SelectionCard/SelectionCard";
import Link from "next/link";
import Button from "../ui/components/Button/Button";
import CalendarContainer from "../ui/components/CalendarContainer/CalendarContainer";
import { BookingContext } from "../context/BookingContext";
import BreadCrumb from "../ui/components/BreadCrumb/BreadCrumb";
import { useRouter } from "next/router";

const BookingCalendar = () => {
  const {
    chosenService,
    chosen,
    chosenSlot,
    setChosenSlot,
    setChosen,
    setChosenService,
    setStoreID,
    storeID,
  } = useContext(BookingContext);

  console.log("chosen slot from calendar", chosenSlot);

  let slotToString = "";

  if (chosenSlot) {
    const dateString = chosenSlot.date.toLocaleString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    slotToString = dateString + " " + chosenSlot.start;
  }

  const router = useRouter();
  const query = router.query;
  if (!storeID) {
    setStoreID(query.storeid);
  }
  useEffect(() => {
    if (!chosenService) {
      setChosenService({
        service: query.service,
        duration: query.duration,
        price: query.price,
        category: query.category,
      });
      setChosen({
        employee: query.employee,
      });
    }
  }, [storeID]);

  function handleBookingClick() {
    router.push("/booking-confirmation");
  }
  //const [selectedTime, setSelectedTime] = useState(null);

  //WE HAVE TO FIND A LOGIC HERE - maybe with moment.js

  return (
    <div className={styles.pageContainer}>
      <BreadCrumb
        steps={[
          "1. Service wählen",
          "2. Stylist*In wählen",
          "3. Termin wählen",
        ]}
        current={2}
      />
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
              service={chosenService?.service}
              duration={chosenService?.duration}
              price={chosenService?.price}
            />
            <SelectItem employee={chosen?.employee} />

            {!chosenSlot && (
              <p className={styles.selectItemText}>Select a time</p>
            )}
            <div onClick={() => setChosenSlot(null)}>
              {" "}
              {chosenSlot && <SelectItem date={slotToString} minus />}
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              icon=""
              size="medium"
              variant="danger"
              onClick={() => router.back()}
            >
              zurück
            </Button>

            <Button
              icon=""
              size="medium"
              variant="primary"
              onClick={() => handleBookingClick()}
            >
              Next step
            </Button>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default BookingCalendar;
