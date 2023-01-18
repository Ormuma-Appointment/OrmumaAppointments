import React from "react";
import styles from "../ui/page_styles/AccountAdmin.module.css";
import AppointmentCard from "../ui/components/AppointmentCard/AppointmentCard";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import InfoElement from "../ui/components/InfoElement/InfoElement";
import Link from "next/link";
import Edit from "../ui/components/assets/edit.svg";
import EmployeeOverview from "../ui/components/EmployeeOverview/EmployeeOverview";

const AccountAdmin = () => {
  const salon = {
    name: "Naturfriseur Aachen",
    street: "Habsburgerallee 11",
    postalcode: "52064",
    city: "Aachen",
    country: "Deutschland",
    email: "naturfriseur@gmail.com",
    website: "www.naturfriseur-aachen.de",
    phone: "+49 1577 37384273",
    employees: [
      { name: "Kasper Schneiderlein", photo: null },
      { name: "Juli Katter", photo: null },
      { name: "Kyle Superwow", photo: null },
    ],
  };
  const todaysAppointments = [
    {
      customer: "Andrea Berg",
      date: "03.01.2023",
      service: "Haar kurz, schneiden, waschen",
      stylist: "Jochen Lambatz",
      time: "11:30-12:00",
    },
    {
      customer: "Andrea Berg",
      date: "03.01.2023",
      service: "Haar kurz, schneiden, waschen",
      stylist: "Jochen Lambatz",
      time: "11:30-12:00",
    },
    {
      customer: "Andrea Berg",
      date: "03.01.2023",
      service: "Haar kurz, schneiden, waschen",
      stylist: "Jochen Lambatz",
      time: "11:30-12:00",
    },
    {
      customer: "Andrea Berg",
      date: "03.01.2023",
      service: "Haar kurz, schneiden, waschen",
      stylist: "Jochen Lambatz",
      time: "11:30-12:00",
    },
    {
      customer: "Andrea Berg",
      date: "03.01.2023",
      service: "Haar kurz, schneiden, waschen",
      stylist: "Jochen Lambatz",
      time: "11:30-12:00",
    },
  ];
  const hours = [
    { day: "Monday", start: "08:00", end: "18:00" },
    { day: "Tuesday", start: "08:00", end: "18:00" },
    { day: "Wednesday", start: "08:00", end: "18:00" },
    { day: "Thursday", start: "08:00", end: "18:00" },
    { day: "Friday", start: "08:00", end: "18:00" },
    { day: "Saturday", start: "08:00", end: "15:00" },
  ];

  return (
    <div className={styles.page_container}>
      <div>
        <h1>Salon Account</h1>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.header}>
            <h3>Salon Übersicht </h3>{" "}
            <Link href="/store-setup" className={styles.edit}>
              <Edit className={styles.icon} />
              bearbeiten
            </Link>
          </div>

          <CardContainer>
            <div className={styles.container_box}>
              <div className={styles.address_container}>
                <ul className={styles.address}>
                  <li>{salon.name}</li>
                  <li>{salon.street}</li>
                  <li>
                    {salon.postalCode} {salon.city}
                  </li>
                  <li>{salon.country}</li>
                </ul>
              </div>
              <div className={styles.contact_container}>
                <InfoElement email infoDetail={salon.email} infoHl="Email" />
                <InfoElement
                  infoDetail={salon.website}
                  infoHl="Website"
                  internet
                />
                <InfoElement infoDetail={salon.phone} infoHl="Telefon" phone />
              </div>
              <div className={styles.opening_container}>
                <h3>Öffnungszeiten</h3>
                {hours.map((el, index) => {
                  return (
                    <div key={index} className={styles.day}>
                      <p>{el.day}</p>{" "}
                      <div>
                        <p>{el.start}</p> - <p> {el.end}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContainer>
        </div>
        <div className={styles.column}>
          <h3>Terminübersicht heute</h3>
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
      <div className={styles.employee_container}>
        <div className={styles.header}>
          <h3>Salon Mitarbeiter*Innen</h3>
          <Link href="/team-setup" className={styles.edit}>
            <Edit className={styles.icon} />
            bearbeiten
          </Link>
        </div>
        <EmployeeOverview employees={salon.employees} />
      </div>
    </div>
  );
};

export default AccountAdmin;
