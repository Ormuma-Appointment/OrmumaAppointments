import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../ui/page_styles/TeamSetup.module.css";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";
import CheckboxSelectElement from "../ui/components/CheckboxSelectElement/CheckboxSelectElement";
import TimeDefinitionSection from "../ui/components/TimeDefinitionSection/TimeDefinitionSection";
import Button from "../ui/components/Button/Button";
import RadioSelectElement from "../ui/components/RadioSelectElement/RadioSelectElement";
import Minus from "../ui/components/assets/minus.svg";
import StylistCard from "../ui/components/StylistCard/StylistCard";
import { useRouter } from "next/router";
import EmployeeOverview from "../ui/components/EmployeeOverview/EmployeeOverview";
import { db } from "../firebase/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";

function TeamSetup() {
  const [showServices, setShowServices] = useState(false);
  let dummyservices = ["Long", "Short", "Bold", "Style"];

  let dummyemployees = [
    {
      name: "Kasper Schneiderlein",
      photo: null,
      description: "Balayage, vibrant color Spezialist",
    },
    { name: "Juli Katter", photo: null, description: "Layers, Bobs, Fringes" },
    {
      name: "Kyle Superwow",
      photo: null,
      description: "Razers, Beards, Nails",
    },
  ];
  let days_times = [
    {
      label: "Mo",
      day: 1,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
    {
      label: "Di",
      day: 2,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
    {
      label: "Mi",
      day: 3,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
    {
      label: "Do",
      day: 4,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
    {
      label: "Fr",
      day: 5,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
    {
      label: "Sa",
      day: 6,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
    {
      label: "So",
      day: 0,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
  ];
  const [services, setServices] = useState(dummyservices);
  const [yesno] = useState(["ja", "nein"]);
  const [times, setTimes] = useState(days_times);
  const [openDays, setOpenDays] = useState([]); // stores values from form checkboxes
  const router = useRouter();
  let dummyemployee = {
    name: "Dummy",
    adress: {
      street: "dummy",
      number: "0",
      postalCode: "00000",
      city: "dummy",
      country: "Deutschland", //prefilled
    },
    telephone: "999999999",
    photo: null,
    services: services,
    description: "dummy",
    workingTime: times,
  };


  // get all Employees from Firebase
  const { currentUser } = useAuthContext();
  const [salonEmployees, setSalonEmployees] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(dummyemployee);
  const [employeeIndex, setEmployeeIndex] = useState(undefined);

  async function getEmployeeData() {
    if (currentUser) {
      let employeesTemp = [];
      const querySnapshot = await getDocs(
        collection(db, "stores", "one", "employeeList")
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        employeesTemp.push(doc.data());
      });
      setSalonEmployees(employeesTemp);
    }
  }
  useEffect(() => {
    getEmployeeData();
  }, [currentUser]);

  useEffect(() => {
    if (employeeIndex || employeeIndex === 0) setHasData(true);
    setSelectedEmployee(salonEmployees[employeeIndex]);
  }, [employeeIndex]);

  useEffect(() => {
    console.log("employeeIndex ", employeeIndex);
    console.log("hasData ", hasData);
  }, [employeeIndex]);


  function handleFormSubmit(e) {
    e.preventDefault();
    let employee = {
      name: e.target.name.value,
      adress: {
        street: e.target.street.value,
        number: e.target.number.value,
        postalCode: e.target.postalCode.value,
        city: e.target.city.value,
        country: "Deutschland", //prefilled
      },
      telephone: e.target.telephone.value,
      photo: e.target.photo.value,
      services: services,
      description: e.target.description.value,
      workingTime: times,
    };
    const q = query(collection(db, "stores"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    console.log(queryData);

    const res = await setDoc(
      doc(db, "stores", queryData[0].id, "employeeList", employee.name),
      employee
    );

    console.log(times);
  }
  function handleBackClick(e, path) {
    e.preventDefault();
    router.push(path);
  }
  function handleRemoveClick(index) {
    setServices((prev) => prev.filter((elem, i) => i !== index));
  }

  function handleCancelClick(e) {
    e.preventDefault();
    setServices(dummyservices);
  }

  return (
    <div>
      <div className={styles.breadcrumb}>
        <Link href="/store-setup">Store Setup</Link>{" "}
        <span className={styles.arrows}> &#9654;</span>{" "}
        <Link href="/service-setup">Services Konfgurieren </Link>{" "}
        <span className={styles.arrows}>&#9654;</span>{" "}
        <span className={styles.current_breadcrumb}>
          <Link href="/team-setup">Team konfigurieren </Link>
        </span>{" "}
        <span className={styles.arrows}>&#9654;</span>
      </div>
      <h1>Team Konfigurieren</h1>
      <CardContainer>
        <div className={styles.container}>
          <form action="" onSubmit={handleFormSubmit}>
            <div className={styles.intro}>
              Um eine Person hinzuzufügen, füllen Sie bitte die unten stehenden
              Felder aus. Sobald Sie auf "Person speichern" klicken, wird diese
              unten auftauchen. Keine persönlichen Daten, werden für Kund*Innen
              sichtbar sein. <br />
              Klicken Sie auf "Person speichern", um alle Daten zu speichern.
            </div>
            <div className={styles.form}>
              <div className={styles.setUpInfos}>
                <div className={styles.row}>
                  <div className={styles.col30}>
                    <label>Name:*</label>
                  </div>
                  <div className={styles.col70}>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      defaultValue={hasData ? selectedEmployee.name : ""}
                      required
                    />
                  </div>
                </div>
                <div className={`${styles.row} ${styles.adresse}`}>
                  <div className={styles.col30}>
                    <label>Adresse:</label>
                  </div>
                  <div className={styles.col70}>
                    <div className={`${styles.row} ${styles.city}`}>
                      <div className={styles.col70}>
                        <Input
                          type="text"
                          name="street"
                          id="street"
                          defaultValue={
                            hasData ? selectedEmployee.adress.street : ""
                          }
                          placeholder="Straße"
                        />
                      </div>{" "}
                      <div className={styles.col30}>
                        <Input
                          type="number"
                          name="number"
                          id="number"
                          defaultValue={
                            hasData ? selectedEmployee.adress.number : ""
                          }
                          placeholder="Nummer"
                        />
                      </div>{" "}
                    </div>
                    <div className={`${styles.row} ${styles.city}`}>
                      <div className={styles.col50}>
                        <Input
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          defaultValue={
                            hasData ? selectedEmployee.adress.postalCode : ""
                          }
                          placeholder="Postleitzahl"
                        />
                      </div>
                      <div className={styles.col50}>
                        <Input
                          type="text"
                          name="city"
                          id="city"
                          defaultValue={
                            hasData ? selectedEmployee.adress.city : ""
                          }
                          placeholder="Stadt"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.col30}>
                    <label>Telefon:</label>
                  </div>
                  <div className={styles.col70}>
                    <Input
                      type="tel"
                      name="telephone"
                      id="telephone"
                      defaultValue={hasData ? selectedEmployee.telephone : ""}
                      placeholder="Telefonnummer"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.col30}>
                    <label>Beschreibung:</label>
                  </div>
                  <div className={styles.col70}>
                    <Input
                      type="text"
                      name="description"
                      id="description"
                      defaultValue={hasData ? selectedEmployee.description : ""}
                      placeholder="z.B. Farbspezialistin, Balayage, ... "
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.col30}>
                    <label>Stylist*Innenfoto:</label>
                  </div>
                  <div className={styles.col70}>
                    <Input type="file" name="photo" id="logo" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.setUpOpenings}>
              <div className={`${styles.row} ${styles.opening}`}>
                <div className={styles.col30}>
                  <label>Arbeitstage:*</label>
                </div>
                <div className={styles.col70}>
                  <CheckboxSelectElement
                    labels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
                    setOpenDays={setOpenDays}
                    openDays={openDays}
                  />
                </div>
              </div>
              <div className={`${styles.row} ${styles.opening}`}>
                <div className={styles.col30}>
                  <label>Arbeitszeiten:*</label>
                </div>
                <div className={styles.col70}>
                  <TimeDefinitionSection
                    openDays={openDays}
                    setTimes={setTimes}
                    times={times}
                  />
                </div>
              </div>
            </div>
            <div className={styles.employee_services}>
              <div>
                <label className={styles.col50} htmlFor="all_service">
                  Bietet diese Person alle Services an?
                </label>
                <div className={styles.col50}>
                  <RadioSelectElement
                    name="services_done"
                    labels={yesno}
                    setShowServices={setShowServices}
                  />
                </div>
              </div>
              {showServices && (
                <>
                  <label className={styles.small_label} htmlFor="all_service">
                    Lösche Services, die von dieser Person nicht angeboten
                    werden. Sie werden nur für diese Person gelöscht.
                  </label>
                  <div className={styles.cat_box}>
                    {services.map((el, index) => {
                      return (
                        <div key={index} className={styles.pill}>
                          {el}
                          <Minus
                            className={styles.icon}
                            onClick={() => handleRemoveClick(index)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    size="xsmall"
                    variant="invisible"
                    onClick={handleCancelClick}
                  >
                    Änderungen rückgängig machen
                  </Button>
                </>
              )}
            </div>
            <div className={styles.footer}>
              <Button
                size="medium"
                variant="danger"
                onClick={(e) => handleBackClick(e, "service-setup")}
              >
                zurück
              </Button>
              <Button icon="" size="medium" variant="primary">
                Person speichern
              </Button>
            </div>
          </form>
          <div className={styles.employee_container}>
            <h2>Alle Mitarbeiter</h2>
            <EmployeeOverview
              employees={salonEmployees}
              setEmployeeIndex={setEmployeeIndex}
            />
          </div>
        </div>
      </CardContainer>
    </div>
  );
}

export default TeamSetup;
