import React from "react";
import styles from "../ui/page_styles/StoreSetup.module.css";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";
import CheckboxSelectElement from "../ui/components/CheckboxSelectElement/CheckboxSelectElement";
import TimeDefinitionSection from "../ui/components/TimeDefinitionSection/TimeDefinitionSection";
import Button from "../ui/components/Button/Button";
const StoreSetup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let passwordConfirmation = e.target.passwordConfirmation.value;

    console.log(email, password, passwordConfirmation);
  };
  return (
    <div>
      <h1>Store Setup</h1>
      <CardContainer>
        <form className={styles.setUpForm} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.setUpInfos}>
            <div className={styles.row}>
              <div className={styles.col30}>
                <label>Salon name*</label>
              </div>
              <div className={styles.col70}>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Salon name"
                  required
                />
              </div>
            </div>
            <div className={`${styles.row} ${styles.adresse}`}>
              <div className={styles.col30}>
                <label>Adresse*</label>
              </div>
              <div className={styles.col70}>
                <Input
                  type="text"
                  name="street"
                  id="street"
                  placeholder="street, number"
                  required
                />
                <div className={`${styles.row} ${styles.city}`}>
                  <div className={styles.col50}>
                    <Input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      placeholder="postal code"
                      required
                    />
                  </div>
                  <div className={styles.col50}>
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="city"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col30}>
                <label>Phone*</label>
              </div>
              <div className={styles.col70}>
                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="telephone number"
                  required
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col30}>
                <label>Logo*</label>
              </div>
              <div className={styles.col70}>
                <Input type="file" name="logo" id="logo" required />
              </div>
            </div>
          </div>

          <div className={styles.setUpOpenings}>
            <div className={`${styles.row} ${styles.opening}`}>
              <div className={styles.col30}>
                <label>Opening Days*</label>
              </div>
              <div className={styles.col70}>
                <CheckboxSelectElement
                  labels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
                />
              </div>
            </div>
            <div className={`${styles.row} ${styles.opening}`}>
              <div className={styles.col30}>
                <label>Opening Days*</label>
              </div>
              <div className={styles.col70}>
                <TimeDefinitionSection />
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button icon="" size="medium" variant="primary">
              primary button
            </Button>
          </div>
        </form>
      </CardContainer>
    </div>
  );
};

export default StoreSetup;
