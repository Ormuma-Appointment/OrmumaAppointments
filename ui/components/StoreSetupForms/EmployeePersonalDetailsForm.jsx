import React from "react";
import styles from "./StoreSetupForm.module.css";
import Input from "../InputField/Input";
function EmployeePersonalDetailsForm({
  hasData,
  selectedEmployee,
  setImageUpload,
}) {
  return (
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
                  defaultValue={hasData ? selectedEmployee.adress.street : ""}
                  placeholder="Straße"
                />
              </div>{" "}
              <div className={styles.col30}>
                <Input
                  type="number"
                  name="number"
                  id="number"
                  defaultValue={hasData ? selectedEmployee.adress.number : ""}
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
                  defaultValue={hasData ? selectedEmployee.adress.city : ""}
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
            <Input
              type="file"
              name="photo"
              id="logo"
              onChange={(e) => setImageUpload(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePersonalDetailsForm;
