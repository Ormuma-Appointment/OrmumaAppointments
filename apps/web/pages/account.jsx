import React, { useEffect, useState } from "react";
import styles from "../ui/page_styles/Account.module.css";
import Button from "../ui/components/Button/Button";
import calendar from "../ui/components/assets/calendar.svg";
import AccountCard from "../ui/components/AccountCard/AccountCard";
import AppointmentCard from "../ui/components/AppointmentCard/AppointmentCard";
import Link from "next/link";
import Edit from "../ui/components/assets/edit.svg";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Account = ({ name }) => {
  const dummyUser = {
    displayName: "",
    email: "",
  };
  const [user, setUser] = useState(dummyUser);
  const { currentUser, isLoggedIn } = useAuthContext();

  async function getData() {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
  }
  useEffect(() => {
    if (currentUser) {
      getData();
    }
    console.log(currentUser);
  }, [currentUser]);

  const pastAppointments = [
    {
      customer: "Andrea Berg",
      date: "03.01.2023",
      service: "Haar kurz, schneiden, waschen",
      stylist: "Jochen Lambatz",
      time: "11:30-12:00",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mein Account</h1>
        <Button icon={calendar} size="medium" variant="primary">
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
        <AccountCard
          className={styles.box}
          name={!user.displayName ? " " : user.displayName}
          email={!user.email ? " " : user.email}
        />
      </div>
      <div className={styles.appointments}>
        <div className={styles.appointment_box}>
          <h3>Mein nächster Termin</h3>
          <AppointmentCard
            cancel
            customer="Andrea Berg"
            date="03.01.2023"
            service="Haar kurz, schneiden, waschen"
            stylist="Jochen Lambatz"
            time="11:30-12:00"
          />
        </div>
        <div className={styles.appointment_box}>
          <h3>Mein vergangenen Termin(e)</h3>
          <div>
            {pastAppointments.map((el, index) => {
              return (
                <AppointmentCard
                  customer={el.name}
                  date={el.date}
                  service={el.service}
                  stylist={el.stylist}
                  time={el.time}
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
