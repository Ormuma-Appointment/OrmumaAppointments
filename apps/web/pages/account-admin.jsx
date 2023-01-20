import React, { useEffect, useState } from "react";
import styles from "../ui/page_styles/AccountAdmin.module.css";
import AppointmentCard from "../ui/components/AppointmentCard/AppointmentCard";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import InfoElement from "../ui/components/InfoElement/InfoElement";
import Link from "next/link";
import Edit from "../ui/components/assets/edit.svg";
import EmployeeOverview from "../ui/components/EmployeeOverview/EmployeeOverview";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const AccountAdmin = () => {
  const salon = {
    openingHours: [
      {
        breakStart: null,
        start: null,
        end: null,
        label: "Mo",
        day: 1,
        breakEnd: null,
      },
      {
        end: null,
        breakStart: null,
        label: "Di",
        start: null,
        breakEnd: null,
        day: 2,
      },
      {
        breakEnd: null,
        breakStart: null,
        day: 3,
        start: null,
        label: "Mi",
        end: null,
      },
      {
        breakEnd: null,
        breakStart: null,
        start: null,
        day: 4,
        end: null,
        label: "Do",
      },
      {
        day: 5,
        end: null,
        start: null,
        breakStart: null,
        breakEnd: null,
        label: "Fr",
      },
      {
        breakEnd: null,
        breakStart: null,
        label: "Sa",
        end: null,
        start: null,
        day: 6,
      },
      {
        breakStart: null,
        label: "So",
        start: null,
        end: null,
        breakEnd: null,
        day: 0,
      },
    ],
    photo: "",
    contact: {
      telephone: "0548115486",
      email: "dummyaddress@test.de",
      website: "",
    },
    address: {
      city: "Petah Tikva",
      street: "Orlov",
      postalCode: "49342",
      country: "Deutschland",
      number: "104",
    },
    name: "Mulugeta birish",
    employees: [
      {
        name: "Kasper Schneiderlein",
        photo: null,
        description: "Balayage, vibrant color Spezialist",
      },
      {
        name: "Juli Katter",
        photo: null,
        description: "Layers, Bobs, Fringes",
      },
      {
        name: "Kyle Superwow",
        photo: null,
        description: "Razers, Beards, Nails",
      },
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

  // query salon info
  const [salonData, setSalonData] = useState(salon);
  async function getData() {
    const docRef = doc(db, "stores", "one");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setSalonData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(() => {
    getData();
  }, []);
  // query opening hours

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
                  <li>{salonData.name}</li>
                  <li>
                    {salonData.address.street} {salonData.address.number}
                  </li>
                  <li>
                    {salonData.address.postalCode} {salonData.address.city}
                  </li>
                  <li>{salonData.address.country}</li>
                </ul>
              </div>
              <div className={styles.contact_container}>
                <InfoElement
                  email
                  infoDetail={salonData.contact.email}
                  infoHl="Email"
                />
                <InfoElement
                  infoDetail={salonData.contact.website}
                  infoHl="Website"
                  internet
                />
                <InfoElement
                  infoDetail={salonData.contact.telephone}
                  infoHl="Telefon"
                  phone
                />
              </div>
              <div className={styles.opening_container}>
                <h3>Öffnungszeiten</h3>
                {salonData.openingHours.map((el, index) => {
                  console.log(el.start);
                  return (
                    <div key={index} className={styles.day}>
                      <p>
                        {
                          [
                            "Sonntag",
                            "Montag",
                            "Dienstag",
                            "Mittwoch",
                            "Donnerstag",
                            "Freitag",
                            "Samstag",
                          ][el.day]
                        }
                      </p>{" "}
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
        {/* <EmployeeOverview employees={salonData.employees} /> */}
        NEED TO WORK ON! EMPLOYEE DATA NO IN DB YET
      </div>
    </div>
  );
};

export default AccountAdmin;
