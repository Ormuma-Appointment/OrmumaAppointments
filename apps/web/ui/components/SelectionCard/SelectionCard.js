import React from "react";
import styles from "./SelectionCard.module.css";
import Link from "next/link";
import SelectItem from "../SelectItem/SelectItem";
import Button from "../Button/Button";

const SelectionCard = (props) => {
  const step = props.step;
  const selected = props.selected;
  const setSelected = props.setSelected;

  const service = props.service;
  return (
    <div>
      <h4>Ihre Auswahl</h4>
      {step === "service" && (
        <>
          <div>
            {!selected && (
              <p className={styles.selectItemText}>Select a service</p>
            )}
            <div onClick={() => setSelected(null)}>
              {selected && (
                <SelectItem
                  duration={selected.duration}
                  minus
                  price={selected.price}
                  title={selected.title}
                />
              )}
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <Button icon="" size="medium" variant="danger">
              <Link href="/">Go back</Link>
            </Button>

            {selected && (
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
            <SelectItem
              duration={service.time}
              price={service.price}
              title={service.style}
            />
            {!selected && (
              <p className={styles.selectItemText}>Select a employee</p>
            )}
            <div onClick={() => setSelected(null)}>
              {selected && <SelectItem title={selected.title} minus />}
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              href="/booking-service"
              icon=""
              size="medium"
              variant="danger"
            >
              <Link href="/booking-service">Go back</Link>
            </Button>

            {selected && (
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
