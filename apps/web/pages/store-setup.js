import React, { useState } from "react";
import styles from "../ui/page_styles/StoreSetup.module.css";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";
import CheckboxSelectElement from "../ui/components/CheckboxSelectElement/CheckboxSelectElement";
import TimeDefinitionSection from "../ui/components/TimeDefinitionSection/TimeDefinitionSection";
import Button from "../ui/components/Button/Button";
import Link from "next/link";

const StoreSetup = () => {
  const [openDays, setOpenDays] = useState([]); // stores values from form checkboxes
  const handleSubmit = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let passwordConfirmation = e.target.passwordConfirmation.value;

    console.log(email, password, passwordConfirmation);
  };
  return (
    <div>
      <div className={styles.breadcrumb}>
        <span className={styles.current_breadcrumb}>
          <Link href="/store-setup">Store Setup</Link>{" "}
        </span>{" "}
        <span className={styles.arrows}> &#9654;</span>{" "}
        <Link href="/service-setup">Services Konfgurieren </Link>{" "}
        <span className={styles.arrows}>&#9654;</span>{" "}
        <Link href="/team-setup">Team konfigurieren </Link>
        <span className={styles.arrows}>&#9654;</span>
      </div>
      <h1>Store Setup</h1>
      <CardContainer>
        <form className={styles.setUpForm} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.setUpInfos}>
            <div className={styles.row}>
              <div className={styles.col30}>
                <label>Salon Name:*</label>
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
                  required
                />
                <div className={`${styles.row} ${styles.city}`}>
                  <div className={styles.col50}>
                    <Input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      placeholder="Postleitzahl"
                      required
                    />
                  </div>
                  <div className={styles.col50}>
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Stadt"
                      required
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
                  required
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col30}>
                <label>Logo:*</label>
              </div>
              <div className={styles.col70}>
                <Input type="file" name="logo" id="logo" required />
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
                <TimeDefinitionSection openDays={openDays} />
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button icon="" size="medium" variant="primary">
              Weiter
            </Button>
          </div>
        </form>
      </CardContainer>
    </div>
  );
};

export default StoreSetup;
