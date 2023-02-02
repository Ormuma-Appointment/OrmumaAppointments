import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
import styles from "../ui/page_styles/Account.module.css";
import Button from "../ui/components/Button/Button";
import calendar from "../ui/components/assets/calendar.svg";
import AccountCard from "../ui/components/AccountCard/AccountCard";
import AppointmentCard from "../ui/components/AppointmentCard/AppointmentCard";
import Link from "next/link";
import Edit from "../ui/components/assets/edit.svg";
import { useRouter } from "next/router";
import moment from "moment";

const Account = () => {
  const router = useRouter();
  const [passtEvents, setPasstEvents] = useState([]);
  const [nextEvents, setNextEvents] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);

  const { currentUser } = useAuthContext();

  let user = {
    userId: currentUser.uid,
    userName: currentUser.displayName,
  };

  console.log(user);

  let currentMomentDate = moment(new Date()).format("YYYY-MM-DD");

  const getEvent = async () => {
    const q = query(
      collection(db, "events"),
      where("clientId", "==", user.userId)
    );
    const docSnap = await getDocs(q);
    let passtEvents = [];
    let nextEvents = [];
    docSnap.forEach((doc) => {
      const el = doc.data();
      if (currentMomentDate <= moment(el.date.toDate()).format("YYYY-MM-DD")) {
        nextEvents.push(el);
      } else {
        passtEvents.push(el);
      }
      setNextEvents(nextEvents);
      setPasstEvents(passtEvents);
      SetIsLoading(false);
    });
  };

  useEffect(() => {
    getEvent();
  }, [user.userId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mein Account</h1>
        <Button
          icon={calendar}
          size="medium"
          variant="primary"
          onClick={() => router.push("/")}
        >
          Termin buchen
        </Button>
      </div>
      <div className={styles.row}>
        <div className={styles.header_small}>
          <h3>Meine Daten</h3>
          <Link href="/store-setup" className={styles.edit}>
            <Edit className={styles.icon} />
            bearbeiten
          </Link>
        </div>
        <AccountCard className={styles.box} />
      </div>
      <div className={styles.appointments}>
        <div className={styles.appointment_box}>
          <h3>Mein nächster Termin</h3>
          {nextEvents.map((event, id) => {
            console.log(event);
            let date = moment(event.date.toDate()).format("YYYY-MM-DD");
            return (
              <AppointmentCard
                key={id}
                cancel
                customer={event.clientName}
                date={date}
                service={event.service}
                stylist={event.employee}
                time={`${event.slot[0]} - ${event.slot[1]}`}
              />
            );
          })}
        </div>
        <div className={styles.appointment_box}>
          <h3>Mein vergangenen Termin(e)</h3>
          <div>
            {passtEvents.map((event, id) => {
              console.log(event);
              let date = moment(event.date.toDate()).format("YYYY-MM-DD");
              return (
                <AppointmentCard
                  key={id}
                  customer={event.clientName}
                  date={date}
                  service={event.service}
                  stylist={event.employee}
                  time={`${event.slot[0]} - ${event.slot[1]}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
  // }
};

export default Account;
