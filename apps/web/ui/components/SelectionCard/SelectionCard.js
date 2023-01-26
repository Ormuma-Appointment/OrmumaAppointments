import styles from "./SelectionCard.module.css";
import Link from "next/link";
import SelectItem from "../SelectItem/SelectItem";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BookingContext } from "../../../context/BookingContext";

const SelectionCard = (props) => {
  const step = props.step;
  const selected = props.selected;
  const setSelected = props.setSelected;
  const service = props.service;
  const router = useRouter();
  const { storeID, chosenService, chosen } = useContext(BookingContext);

  function handleBookingClick() {
    console.log(router.pathname);
    if (router.pathname === "/booking-service") {
      if (storeID) {
        router.push({
          pathname: "/booking-employee",
          query: {
            storeid: storeID,
            service: chosenService.service,
            category: chosenService.category,
            duration: chosenService.duration,
            price: chosenService.price,
          },
        });
      } else {
        router.push("/booking-employee");
      }
    } else if (router.pathname === "/booking-employee") {
      if (storeID) {
        router.push({
          pathname: "/booking-calendar",
          query: {
            storeid: storeID,
            service: chosenService.service,
            category: chosenService.category,
            duration: chosenService.duration,
            price: chosenService.price,
            employee: chosen.employee,
          },
        });
      } else {
        router.push("/booking-calendar");
      }
    }
  }

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
            <Button
              icon=""
              size="medium"
              variant="danger"
              onClick={() => router.back()}
            >
              zurück
            </Button>

            {selected && (
              <Button
                icon=""
                size="medium"
                variant="primary"
                onClick={() => handleBookingClick()}
              >
                Weiter
              </Button>
            )}
          </div>
        </>
      )}
      {step === "employee" && (
        <>
          <div>
            <SelectItem
              duration={service?.duration}
              price={service?.price}
              service={service?.service}
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
              size="medium"
              variant="danger"
              onClick={() => router.back()}
            >
              zurück
            </Button>

            {selected && (
              <Button
                size="medium"
                variant="primary"
                onClick={() => handleBookingClick()}
              >
                Weiter
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectionCard;
