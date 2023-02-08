import React from "react";
import styles from "./AppointmentCard.module.css";
import CardContainer from "../CardContainer/CardContainer";
import Customers from "../assets/customers.svg";
import Contact from "../assets/contact.svg";
import Stylist from "../assets/stylist.svg";
import Cut from "../assets/scissors.svg";
import Button from "../Button/Button";
import { db } from "../../../firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../context/AuthContext";
function AppointmentCard({
  date,
  time,
  stylist,
  customer,
  service,
  cancel,
  id,
  setReload,
  event,
}) {
  const router = useRouter();
  const { isAdmin } = useAuthContext();
  const deleteEvent = async (e) => {
    e.preventDefault();
    await deleteDoc(doc(db, "events", id));
    setReload((prev) => !prev);
  };

  function handleBookAgain() {
    router.push(
      `/booking-calendar?storeid=${event.storeId}&service=${event.service}&category=${event.category}&duration=${event.duration}&price=${event.price}&employee=${event.employee}&employeeId=${event.employeeId}`
    );
  }

  return (
    <CardContainer>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.time}>
            {date} / {time}
          </div>
          {cancel ? (
            <Button onClick={deleteEvent} size="xsmall" variant="danger">
              absagen
            </Button>
          ) : (
            <Button size="xsmall" variant="primary" onClick={handleBookAgain}>
              erneut buchen
            </Button>
          )}
        </div>
        {isAdmin && (
          <div className={styles.info}>
            <Customers className={styles.icon} />
            {customer && (
              <p>
                {customer} {!event?.clientId && <>(Gast)</>}
              </p>
            )}
          </div>
        )}

        {isAdmin && (event?.clientTelephone || event?.clientEmail) && (
          <div className={styles.info}>
            <Contact className={styles.icon} />
            {event?.clientEmail && <p> {event?.clientEmail}</p>}
            {event?.clientEmail && event?.clientTelephone && "/"}
            {event?.clientTelephone && <p> {event?.clientTelephone}</p>}
          </div>
        )}
        <div className={styles.info}>
          <Stylist className={styles.icon} />
          {stylist && <p>{stylist}</p>}
        </div>
        <div className={styles.info}>
          <Cut className={styles.icon} />
          <p>{service}</p>
        </div>
      </div>
    </CardContainer>
  );
}

export default AppointmentCard;
