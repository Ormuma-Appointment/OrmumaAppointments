import { useState, useEffect } from "react";
import styles from "./SelectionCard.module.css";
import Link from "next/link";
import SelectItem from "../SelectItem/SelectItem";
import Button from "../Button/Button";

const SelectionCard = (props) => {
  const [selectedService, setSelectedService] = useState({});
  const step = props.step;
  const selected = props.selected;
  const setSelected = props.setSelected;
  const service = props.service;

  //console.log("SELECTED FROM SELECTION CARD", selected);

  useEffect(() => {
    if (selected) {
      let selectedService = {
        service: selected.service,
        duration: selected.duration,
      };
      setSelectedService(selectedService);
    }
  }, [selected]);

  //console.log("selectedService", selectedService);

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
                  service={selected.service}
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
                <Link
                  href={{
                    pathname: "/booking-employee",
                    query: selectedService,
                  }}
                >
                  Next step
                </Link>
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
              employee={service.style}
            />
            {!selected && (
              <p className={styles.selectItemText}>Select a employee</p>
            )}
            <div onClick={() => setSelected(null)}>
              {selected && <SelectItem employee={selected.employee} minus />}
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
                <Link href="/booking-calendar">Next step</Link>
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectionCard;
