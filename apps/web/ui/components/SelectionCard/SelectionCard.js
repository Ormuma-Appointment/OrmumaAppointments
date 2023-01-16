import React from "react";
import styles from "./SelectionCard.module.css";
import Link from "next/link";
import SelectItem from "../SelectItem/SelectItem";
import Button from "../Button/Button";

const SelectionCard = (props) => {
  const step = props.step;
  const selectedService = props.selectedService;
  const setSelectedService = props.setSelectedService;
  const selectedEmployee = props.selectedEmployee;
  const setSelectedEmployee = props.setSelectedEmployee;
  const service = props.service;
  return (
    <div>
      <h4>Ihre Auswahl</h4>
      {step === "service" && (
        <>
          <div>
            {!selectedService && (
              <p className={styles.selectItemText}>Select a service</p>
            )}
            <div onClick={() => setSelectedService(null)}>
              {selectedService && (
                <SelectItem
                  duration={selectedService.duration}
                  minus
                  price={selectedService.price}
                  title={selectedService.title}
                />
              )}
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <Button icon="" size="medium" variant="danger">
              <Link href="/">Go back</Link>
            </Button>

            {selectedService && (
              <Button icon="" size="medium" variant="primary">
                <Link href="/booking-employee">Next step</Link>
              </Button>
            )}
          </div>
        </>
      )}
      {step === "employee" && (
        <>
          <div>
            <SelectItem service={service} />
            {!selectedEmployee && (
              <p className={styles.selectItemText}>Select a employee</p>
            )}
            <div onClick={() => setSelectedEmployee(null)}>
              {selectedEmployee && (
                <SelectItem
                  employee={selectedEmployee}
                  icon="fa-solid fa-circle-minus"
                  danger="danger"
                />
              )}
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <Button icon="" size="medium" variant="danger">
              <Link href="/">Go back</Link>
            </Button>

            {selectedEmployee && (
              <Button icon="" size="medium" variant="primary">
                <Link href="/">Next step</Link>
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectionCard;
