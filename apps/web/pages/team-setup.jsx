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

function TeamSetup() {
  const [showServices, setShowServices] = useState(false);
  let dummyservices = ["Long", "Short", "Bold", "Style"];
  let dummyemployees = [
    { name: "Kasper Schneiderlein", photo: null },
    { name: "Juli Katter", photo: null },
    { name: "Kyle Superwow", photo: null },
  ];
  const [services, setServices] = useState(dummyservices); // will need to get the services from the page before or from firebase directly
  const [yesno] = useState(["ja", "nein"]);
  const [allEmployees, setAllEmployees] = useState(dummyemployees);
  const [times, setTimes] = useState(undefined);

  const [openDays, setOpenDays] = useState([]); // stores values from form checkboxes

  function handleFormSubmit(e) {
    e.preventDefault();
    let obj = {
      name: e.target.name.value,
      street: e.target.street.value,
      postalCode: e.target.postalCode.value,
      city: e.target.city.value,
      phone: e.target.phone.value,
      photo: e.target.photo.value,
      services: services,
      times: times,
    };

    console.log(obj);
  }

  function handleRemoveClick(index) {
    setServices((prev) => prev.filter((elem, i) => i !== index));
  }

  function handleCancelClick(e) {
    e.preventDefault();
    setServices(dummyservices);
  }

  useEffect(() => {
    console.log(openDays);
  }, [openDays]);

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
              Klicken Sie auf "Prozess beenden", um alle Daten zu speichern.
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
                      required
                    />
                  </div>
                </div>
                <div className={`${styles.row} ${styles.adresse}`}>
                  <div className={styles.col30}>
                    <label>Adresse:</label>
                  </div>
                  <div className={styles.col70}>
                    <Input
                      type="text"
                      name="street"
                      id="street"
                      placeholder="Straße, Nummer"
                    />
                    <div className={`${styles.row} ${styles.city}`}>
                      <div className={styles.col50}>
                        <Input
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          placeholder="Postleitzahl"
                        />
                      </div>
                      <div className={styles.col50}>
                        <Input
                          type="text"
                          name="city"
                          id="city"
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
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Telefonnummer"
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
            <Button icon="" size="medium" variant="primary">
              Person speichern
            </Button>
          </form>
          <div className={styles.employee_container}>
            <h2>Alle Mitarbeiter</h2>
            <div className={styles.employees}>
              {allEmployees.map((el, index) => {
                return <StylistCard key={index} name={el.name} />;
              })}
            </div>
          </div>
        </div>
      </CardContainer>
    </div>
  );
}

export default TeamSetup;
