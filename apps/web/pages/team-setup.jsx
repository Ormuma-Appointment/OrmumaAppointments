import React from "react";
import Link from "next/link";
import styles from "../ui/page_styles/TeamSetup.module.css";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";
import CheckboxSelectElement from "../ui/components/CheckboxSelectElement/CheckboxSelectElement";
import TimeDefinitionSection from "../ui/components/TimeDefinitionSection/TimeDefinitionSection";
import Button from "../ui/components/Button/Button";
import RadioSelectElement from "../ui/components/RadioSelectElement/RadioSelectElement";

function TeamSetup() {
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(e.target.ja.value);
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
                      placeholder="Salon Name"
                      required
                    />
                  </div>
                </div>
                <div className={`${styles.row} ${styles.adresse}`}>
                  <div className={styles.col30}>
                    <label>Adresse:*</label>
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
                    <label>Telefon:*</label>
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
                    <label>Stylist*Innenfoto:*</label>
                  </div>
                  <div className={styles.col70}>
                    <Input type="file" name="logo" id="logo" />
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
                  />
                </div>
              </div>
              <div className={`${styles.row} ${styles.opening}`}>
                <div className={styles.col30}>
                  <label>Arbeitszeiten:*</label>
                </div>
                <div className={styles.col70}>
                  <TimeDefinitionSection />
                </div>
              </div>
            </div>
            <div className={styles.employee_services}>
              <div>
                <label className={styles.col30} htmlFor="all_service">
                  Bietet diese Person alle Services an?
                </label>
                <div className={styles.col70}>
                  <RadioSelectElement
                    name="services_done"
                    labels={["ja", "nein"]}
                  />
                </div>
              </div>
            </div>
            <Button icon="" size="medium" variant="primary">
              Person speichern
            </Button>
          </form>
        </div>
      </CardContainer>
    </div>
  );
}

export default TeamSetup;
