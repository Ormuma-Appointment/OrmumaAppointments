import React from "react";
import styles from "./StoreSetupForm.module.css";
import RadioSelectElement from "../RadioSelectElement/RadioSelectElement";
import Button from "../Button/Button";
import Minus from "../../../ui/components/assets/minus.svg";

function EmployeeServicesForm({
  setShowServices,
  showServices,
  setNoSelected,
  noSelected,
  setServices,
  services,
  hasData,
  dbServices,
  selectedEmployee,
  reverseTransform,
}) {
  function handleRemoveClick(index) {
    setServices((prev) => prev.filter((elem, i) => i !== index));
  }
  function handleLoadClick(e) {
    e.preventDefault();
    setServices(dbServices);
  }

  function handleCancelClick(e) {
    e.preventDefault();
    if (hasData) {
      setServices(reverseTransform(selectedEmployee.services));
    } else {
      if (dbServices) {
        setServices(dbServices);
      }
    }
  }
  return (
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
            Lösche Services, die von dieser Person nicht angeboten werden. Sie
            werden nur für diese Person gelöscht.
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
            <Button size="xsmall" variant="invisible" onClick={handleLoadClick}>
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
  );
}

export default EmployeeServicesForm;
