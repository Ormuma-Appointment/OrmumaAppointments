import React from "react";
import Link from "next/link";
import styles from "../ui/page_styles/TeamSetup.module.css";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";
import CheckboxSelectElement from "../ui/components/CheckboxSelectElement/CheckboxSelectElement";
import TimeDefinitionSection from "../ui/components/TimeDefinitionSection/TimeDefinitionSection";
import Button from "../ui/components/Button/Button";

function TeamSetup() {
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
      <h1>Store Setup</h1>
      <CardContainer>
        <div className={styles.container}>
          <form action="">
            <div className={styles.intro}>
              To add a salon employee fill out the fields below and click on
              add. The employee will appear below. None of the personal
              information will be visible to the customers.
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
                    <label>Stylistenfoto:*</label>
                  </div>
                  <div className={styles.col70}>
                    <Input type="file" name="logo" id="logo" required />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.setUpOpenings}>
              <div className={`${styles.row} ${styles.opening}`}>
                <div className={styles.col30}>
                  <label>Öffnungstage:*</label>
                </div>
                <div className={styles.col70}>
                  <CheckboxSelectElement
                    labels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
                  />
                </div>
              </div>
              <div className={`${styles.row} ${styles.opening}`}>
                <div className={styles.col30}>
                  <label>Öffnungszeiten:*</label>
                </div>
                <div className={styles.col70}>
                  <TimeDefinitionSection />
                </div>
              </div>
            </div>
          </form>
        </div>
      </CardContainer>
    </div>
  );
}

export default TeamSetup;
