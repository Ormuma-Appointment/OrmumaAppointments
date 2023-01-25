import React, { useEffect, useState } from "react";
import { workingTimes } from "../data-sample";
import BreadCrumb from "../../ui/components/BreadCrumb/BreadCrumb";
import styles from "../../ui/page_styles/TeamSetup.module.css";
import CardContainer from "../../ui/components/CardContainer/CardContainer";
import Input from "../../ui/components/InputField/Input";
import TimeDefinitionSection from "../../ui/components/TimeDefinitionSection/TimeDefinitionSection";
import Button from "../../ui/components/Button/Button";
import RadioSelectElement from "../../ui/components/RadioSelectElement/RadioSelectElement";
import Minus from "../../ui/components/assets/minus.svg";
import { useRouter } from "next/router";
import EmployeeOverview from "../../ui/components/EmployeeOverview/EmployeeOverview";
import { db } from "../../firebase/firebase";
import {
  doc,
  setDoc,
  query,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";

function TeamSetup() {
  const [loading, setLoading] = useState(true);
  const [showServices, setShowServices] = useState(false);
  let dummyservices = ["no data"];
  const { currentUser, storeID } = useAuthContext();
  let days_times = workingTimes;
  const [times, setTimes] = useState(days_times);
  const [services, setServices] = useState(dummyservices);
  const router = useRouter();
  const [dbServices, setDbServices] = useState([]);
  const [salonEmployees, setSalonEmployees] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(undefined);
  const [employeeIndex, setEmployeeIndex] = useState(undefined);
  const [employeeFirebaseID, setEmployeeFirebaseID] = useState([]);
  const [noSelected, setNoSelected] = useState(false);
  if (!storeID) {
    router.push("/store-setup/store");
  }

  // get services from Store Collection services
  async function getDBServices() {
    if ((currentUser, storeID)) {
      const docRef = doc(db, "stores", storeID, "services", "serviceList");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().serviceObj);
        let data = docSnap.data().serviceObj;
        if (data[0]) {
          let temp = [];
          data.forEach((el) => {
            el.services.forEach((elem) =>
              temp.push(`${el.category}  -  ${elem.service}`)
            );
          });
          setServices(temp);
          setDbServices(temp);
        }
      } else {
        console.log("No such document!");
      }
    }
  }
  useEffect(() => {
    getDBServices();
  }, [storeID]);
  // get all Employees from Firebase

  async function getEmployeeData() {
    if ((currentUser, storeID)) {
      let employeesTemp = [];
      let idsTemp = [];
      const querySnapshot = await getDocs(
        collection(db, "stores", storeID, "employeeList")
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        employeesTemp.push(doc.data());
        idsTemp.push(doc.id);
      });
      setSalonEmployees(employeesTemp);
      setEmployeeFirebaseID(idsTemp);
    }
    setLoading(false);
  }
  useEffect(() => {
    getEmployeeData();
  }, [storeID]);

  useEffect(() => {
    if (employeeIndex || employeeIndex === 0) setHasData(true);
    setSelectedEmployee(salonEmployees[employeeIndex]);
    setShowServices(true);
    setNoSelected(true);
  }, [employeeIndex]);

  function reverseTransform(obj) {
    let result = [];
    obj.forEach((item) => {
      item.services.forEach((service) => {
        result.push(`${item.category}  -  ${service.service}`);
      });
    });
    return result;
  }

  useEffect(() => {
    if (hasData) {
      setServices(reverseTransform(selectedEmployee.services));
      setTimes(selectedEmployee.workingTime);
    }
  }, [selectedEmployee]);

  function transformArray(arr) {
    let result = {};
    arr.forEach((item) => {
      let parts = item.split("  -  ");
      let category = parts[0];
      let service = parts[1];
      if (!result[category]) {
        result[category] = {
          category: category,
          services: [{ service: service }],
        };
      } else {
        result[category].services.push({ service: service });
      }
    });
    return Object.values(result);
  }

  async function handleFormSubmit(e) {
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
      services: transformArray(services),
      description: e.target.description.value,
      workingTime: times,
    };
    const q = query(collection(db, "stores"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));

    if (hasData) {
      await updateDoc(
        doc(
          db,
          "stores",
          storeID,
          "employeeList",
          employeeFirebaseID[employeeIndex]
        ),
        employee
      );
    } else {
      const res = await setDoc(
        doc(db, "stores", queryData[0].id, "employeeList", employee.name),
        employee
      );
    }
    // reload page and clear all fields
    router.reload(window.location.pathname);
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
    if (hasData) {
      setServices(selectedEmployee.services);
    } else {
      if (dbServices) {
        setServices(dbServices);
      } else {
        setServices(dummyservices);
      }
    }
  }
  function handleLoadClick(e) {
    e.preventDefault();
    setServices(dbServices);
  }
  if (!loading) {
    return (
      <div>
        <BreadCrumb
          steps={["Store Setup", "Services Konfgurieren", "Team konfigurieren"]}
          current={2}
        />
        <h1 id="top">Team Konfigurieren</h1>
        <CardContainer>
          <div className={styles.container}>
            <form action="" onSubmit={handleFormSubmit}>
              <div className={styles.intro}>
                Um eine Person hinzuzufügen, füllen Sie bitte die unten
                stehenden Felder aus. Sobald Sie auf "Person speichern" klicken,
                wird diese unten auftauchen. Keine persönlichen Daten, werden
                für Kund*Innen sichtbar sein. <br />
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
                        defaultValue={
                          hasData ? selectedEmployee.description : ""
                        }
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
                    <label>Öffnungszeiten:*</label>
                  </div>
                  <div className={styles.col70}>
                    <TimeDefinitionSection
                      openDays={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
                      setTimes={setTimes}
                      times={times}
                      hasData={hasData}
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
                      labels={["ja", "nein"]}
                      setShowServices={setShowServices}
                      hasData={hasData}
                      setNoSelected={setNoSelected}
                      noSelected={noSelected}
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
                    <div className={styles.button_group}>
                      <Button
                        size="xsmall"
                        variant="invisible"
                        onClick={handleLoadClick}
                      >
                        Alle Services des Salons laden
                      </Button>
                      <Button
                        size="xsmall"
                        variant="invisible"
                        onClick={handleCancelClick}
                      >
                        Änderungen rückgängig machen
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.footer}>
                <Button
                  size="medium"
                  variant="danger"
                  onClick={(e) => handleBackClick(e, "/store-setup/service")}
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
}

export default TeamSetup;
