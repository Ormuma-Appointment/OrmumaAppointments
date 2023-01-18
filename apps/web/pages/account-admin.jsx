import React from "react";
import styles from "../ui/page_styles/AccountAdmin.module.css";
import Button from "../ui/components/Button/Button";
import calendar from "../ui/components/assets/calendar.svg";
import AccountCard from "../ui/components/AccountCard/AccountCard";
import AppointmentCard from "../ui/components/AppointmentCard/AppointmentCard";
import CardContainer from "../ui/components/CardContainer/CardContainer";

const AccountAdmin = () => {
  const salon = {
    name: "Naturfriseur Aachen",
    street: "Habsburgerallee 11",
    postalcode: "52064",
    city: "Aachen",
    country: "Deutschland",
  };
  const todaysAppointments = [
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
      </div>
      <div className={styles.row}>
        <h3>Salon Übersicht</h3>
        <CardContainer>
          <div className={styles.container}>
            <div className={styles.address}>
              <ul>
                <li>{salon.name}</li>
                <li>{salon.street}</li>
                <li>
                  {salon.postalCode} {salon.city}
                </li>
                <li>{salon.country}</li>
              </ul>
            </div>
          </div>
        </CardContainer>
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
            {todaysAppointments.map((el, index) => {
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

export default AccountAdmin;
