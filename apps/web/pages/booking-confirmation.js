import { useState, useContext, useEffect } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/Booking.module.css";
import SelectItem from "../ui/components/SelectItem/SelectItem";
import Button from "../ui/components/Button/Button";
import AppointmentConfirmation from "../ui/components/AppointmentConfirmation/AppointmentConfirmation";
import { BookingContext } from "../context/BookingContext";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import Input from "../ui/components/InputField/Input";

const BookingConfirmation = () => {
  const { chosenService, chosen, chosenSlot, slotToString, storeId } =
    useContext(BookingContext);
  const router = useRouter();
  if (chosenSlot) {
  } else {
    router.back();
  }
  const [confirmed, setConfirmed] = useState(false);
  const { currentUser, isAdmin } = useAuthContext();
  const [storeName, setStoreName] = useState(undefined);
  const [client, setClient] = useState({
    clientName: isAdmin ? currentUser.displayName : null,
    clientId: isAdmin ? currentUser.uid : null,
  });

  async function getStoreName(storeId) {
    if (storeId) {
      const docRef = doc(db, "stores", storeId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().name);
        setStoreName(docSnap.data().name);
      } else {
        console.log("No such document!");
      }
    }
  }
  useEffect(() => {
    if (storeId) {
      getStoreName(storeId);
    }
  }, [storeId]);

  let event = {
    ...chosen,
    ...chosenService,
    ...chosenSlot,
    ...client,
    storeName,
  };

  async function handleBookingConfirmation(e) {
    e.preventDefault();
    setConfirmed(!confirmed);
    const newEventRef = doc(collection(db, "events"));
    await setDoc(newEventRef, event);

    router.push("/booking-confirmation");
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.center}>Ihre Buchungsbestätigung</h1>
      {confirmed ? (
        <>
          <AppointmentConfirmation
            employee={event.employee}
            store={event.storeName}
            start={event.start}
            date={event.date}
          />
          <div className={styles.buttonsContainer}>
            <Button
              size="medium"
              variant="primary"
              onClick={() => router.push("/")}
            >
              Zur Startseite
            </Button>
            <Button
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
            <h4>Ihre Auswahl</h4>
            {isAdmin && (
              <div>
                <Input
                  placeholder="Name der Kunden"
                  onChange={(e) =>
                    setClient({
                      ...client,
                      clientName: e.target.value,
                      clientId: null,
                    })
                  }
                />
                <Input
                  placeholder="Email / Telefonnummer"
                  onChange={(e) =>
                    setClient({
                      ...client,
                      clientContact: e.target.value,
                      clientId: null,
                    })
                  }
                />
              </div>
            )}
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
                size="medium"
                variant="danger"
              >
                zurück
              </Button>
              <Button
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
