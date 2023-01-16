import React from "react";
import styles from "../ui/page_styles/StoreSetup.module.css";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";

const StoreSetup = () => {
  return (
    <div>
      <h1>Store Setup</h1>
      <CardContainer>
        <form className={styles.setUpForm} onSubmit={(e) => handleLogin(e)}>
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

          <div className={styles.setUpOpenings}></div>
        </form>
      </CardContainer>
    </div>
  );
};

export default StoreSetup;
