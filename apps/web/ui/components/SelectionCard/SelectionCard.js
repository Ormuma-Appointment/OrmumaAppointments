import { useState, useEffect } from "react";
import styles from "./SelectionCard.module.css";
import Link from "next/link";
import SelectItem from "../SelectItem/SelectItem";
import Button from "../Button/Button";

const SelectionCard = (props) => {
  const step = props.step;
  const selected = props.selected;
  const setSelected = props.setSelected;
  const service = props.service;
  const category = props.category;
  const [event, setEvent] = useState(service);
  const [eventTest, setEventTest] = useState(service);
  //const [selectedEmployee, setSelectedEmployee] = useState({});

  //console.log("SELECTED FROM SELECTION CARD", selected);

  useEffect(() => {
    if (selected) {
      if (!service) {
        let selectedService = {
          service: selected.service,
          duration: selected.duration,
          price: selected.price,
          category: category,
        };
        setEvent(selectedService);
      } else if (step === "employee") {
        event.employee = selected.employee;
        setEvent(event);
        //setSelectedEmployee(selectedEmployee);
      }
    }
  }, [selected]);

  console.log("Event", event);
  console.log("Event test", eventTest);

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
                    query: event,
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
              duration={service.duration}
              price={service.price}
              service={service.service}
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
              <Link
                href={{
                  pathname: "/booking-service",
                  query: event,
                }}
              >
                Go back
              </Link>
            </Button>

            {selected && (
              <Button icon="" size="medium" variant="primary">
                <Link
                  href={{
                    pathname: "/booking-calendar",
                    query: event,
                  }}
                >
                  Next step
                </Link>
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectionCard;
