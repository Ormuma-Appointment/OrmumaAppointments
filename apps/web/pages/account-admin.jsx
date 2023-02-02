import {
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styles from "../ui/page_styles/AccountAdmin.module.css";
import AppointmentCard from "../ui/components/AppointmentCard/AppointmentCard";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import InfoElement from "../ui/components/InfoElement/InfoElement";
import Link from "next/link";
import Edit from "../ui/components/assets/edit.svg";
import EmployeeOverview from "../ui/components/EmployeeOverview/EmployeeOverview";
import { db } from "../firebase/firebase";
import { useAuthContext } from "../context/AuthContext";
import Button from "../ui/components/Button/Button";
import { useRouter } from "next/router";
import moment from "moment";

const AccountAdmin = () => {
  const router = useRouter();
  const [passtEvents, setPasstEvents] = useState([]);
  const [nextEvents, setNextEvents] = useState([]);
  const [todayEvents, setTodayEvents] = useState([]);
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
    name: "Not From Firebase",
    employees: [
      {
        name: "Kasper Schneiderlein",
        photo: null,
        description: "Balayage, vibrant color Spezialist",
      },
    ],
  };

  // get salon data for salon overview from Firebase
  const { currentUser, adminStoreID } = useAuthContext();
  const [salonData, setSalonData] = useState(salon);
  const [isLoading, setIsLoading] = useState(true);
  async function getSalonData() {
    if (adminStoreID) {
      const docRef = doc(db, "stores", adminStoreID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
        setSalonData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
  }

  // get Employees for Employee-Listing from Firebase
  const [salonEmployees, setSalonEmployees] = useState(salon.employees);
  const [employeeIndex, setEmployeeIndex] = useState(0);

  async function getEmployeeData() {
    if (adminStoreID) {
      let employeesTemp = [];
      const querySnapshot = await getDocs(
        collection(db, "stores", adminStoreID, "employeeList")
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        employeesTemp.push({ id: doc.id, ...doc.data() });
      });
      setSalonEmployees(employeesTemp);
    }
  }

  //get events
  let currentMomentDate = moment(new Date()).format("YYYY-MM-DD");
  const getEvent = async () => {
    const q = query(
      collection(db, "events"),
      where("storeID", "==", adminStoreID)
    );
    const docSnap = await getDocs(q);
    let passtEvents = [];
    let nextEvents = [];
    let todayEvents = [];
    docSnap.forEach((doc) => {
      const el = doc.data();
      if (currentMomentDate === moment(el.date.toDate()).format("YYYY-MM-DD")) {
        todayEvents.push(el);
      } else if (
        currentMomentDate < moment(el.date.toDate()).format("YYYY-MM-DD")
      ) {
        nextEvents.push(el);
      } else {
        passtEvents.push(el);
      }
      setTodayEvents(todayEvents);
      setNextEvents(nextEvents);
      setPasstEvents(passtEvents);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getSalonData();
    getEmployeeData();
    getEvent();
    setIsLoading(false);
  }, [adminStoreID]);

  console.log("today", todayEvents);
  console.log("next", nextEvents);
  console.log("passt", passtEvents);

  if (!isLoading) {
    if (adminStoreID) {
      return (
        <div className={styles.page_container}>
          <div>
            <h1>Salon Account</h1>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.header}>
                <h2>Salon Übersicht </h2>{" "}
                <Link href="/store-setup/store" className={styles.edit}>
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
                            {el.start ? (
                              <>
                                <p>{el.start}</p> - <p> {el.end}</p>
                              </>
                            ) : (
                              <p>geschlossen</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContainer>
            </div>
            <div className={styles.column}>
              <h2>Terminübersicht heute</h2>
              {todayEvents.map((event, id) => {
                let date = moment(event.date.toDate()).format("YYYY-MM-DD");
                return (
                  <AppointmentCard
                    customer={event.clientName}
                    key={id}
                    date={date}
                    service={event.service}
                    stylist={event.employee}
                    time={`${event.slot[0]} - ${event.slot[1]}`}
                  />
                );
              })}
              <h2>Die nächsten Termine</h2>
              {nextEvents.slice(0, 5).map((event, id) => {
                let date = moment(event.date.toDate()).format("YYYY-MM-DD");
                return (
                  <AppointmentCard
                    customer={event.clientName}
                    key={id}
                    date={date}
                    service={event.service}
                    stylist={event.employee}
                    time={`${event.slot[0]} - ${event.slot[1]}`}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.employee_container}>
            <div className={styles.header}>
              <h2>Salon Mitarbeiter*Innen</h2>
              <Link href="/store-setup/team" className={styles.edit}>
                <Edit className={styles.icon} />
                bearbeiten
              </Link>
            </div>
            <EmployeeOverview
              employees={salonEmployees}
              setEmployeeIndex={setEmployeeIndex}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.page_container_empty}>
          <h1>Hier gibts noch nichts zu sehen ...</h1>
          <p>
            Um Kund*Innen Termine buchen zu lassen, klicken Sie auf den Button,
            um ihren Salon zu konfigurieren.
          </p>
          <Button
            size="medium"
            variant="primary"
            onClick={() => router.push("/store-setup/store")}
          >
            Salon erstellen
          </Button>
        </div>
      );
    }
  }
};

export default AccountAdmin;
