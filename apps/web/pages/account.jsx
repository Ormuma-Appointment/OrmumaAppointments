import React from "react";
import styles from "../ui/page_styles/Account.module.css";
import Button from "../ui/components/Button/Button";
import calendar from "../ui/components/assets/calendar.svg";
import AccountCard from "../ui/components/AccountCard/AccountCard";
import AppointmentCard from "../ui/components/AppointmentCard/AppointmentCard";
import Link from "next/link";
import Edit from "../ui/components/assets/edit.svg";
import { WithAuth } from "../route/route";
import { useRouter } from "next/router";

const Account = () => {
  const pastAppointments = [
    {
      customer: "Andrea Berg",
      date: "03.01.2023",
      service: "Haar kurz, schneiden, waschen",
      stylist: "Jochen Lambatz",
      time: "11:30-12:00",
    },
  ];
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mein Account</h1>
        <Button
          icon={calendar}
          size="medium"
          variant="primary"
          onClick={() => router.push("/booking-service")}
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
                  key={index}
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
