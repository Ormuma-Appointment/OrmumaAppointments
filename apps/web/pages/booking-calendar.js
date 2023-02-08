import { useContext, useEffect } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
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
    setStoreId,
    storeId,
    slotToString,
  } = useContext(BookingContext);
  const router = useRouter();

  const query = router.query;
  if (!storeId) {
    setStoreId(query.storeid);
  }
  useEffect(() => {
    setChosenService({
      service: query.service,
      duration: query.duration,
      price: query.price,
      category: query.category,
      storeId: storeId,
    });
    setChosen({
      employee: query.employee,
      employeeId: query.employeeId,
    });
  }, [storeId]);

  function handleBookingClick() {
    router.push("/booking-confirmation");
  }

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
      <h1>Termin wählen</h1>
      <div className={styles.bookingContainer}>
        <CardContainer>
          <h4>Calendar</h4>
          <CalendarContainer />
        </CardContainer>
        <div className="container" id="overview">
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
              size="medium"
              variant="danger"
              onClick={() => router.back()}
            >
              zurück
            </Button>
            {chosenSlot && (
              <Button
                size="medium"
                variant="primary"
                onClick={() => handleBookingClick()}
              >
                Next step
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
