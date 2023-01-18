import React from "react";
import styles from "../ui/page_styles/Account.module.css";
import Button from "../ui/components/Button/Button";
import calendar from "../ui/components/assets/calendar.svg";
import AccountCard from "../ui/components/AccountCard/AccountCard";
import AppointmentCard from "../ui/components/AppointmentCard/AppointmentCard";

const AccountAdmin = () => {
  const pastAppointments = [
    {
      customer: "Andrea Berg",
      date: "03.01.2023",
      service: "Haar kurz, schneiden, waschen",
      stylist: "Jochen Lambatz",
      time: "11:30-12:00",
    },
  ];

  console.log(currentUser);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mein Account</h1>
        <Button icon={calendar} size="medium" variant="primary">
          Termin buchen
        </Button>
      </div>
      <div>
        <h3>Meine Daten</h3>
        <AccountCard className={styles.box}></AccountCard>
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
