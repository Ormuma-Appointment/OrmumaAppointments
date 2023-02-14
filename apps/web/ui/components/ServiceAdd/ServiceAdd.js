import React, { useEffect, useState } from "react";
import styles from "./ServiceAdd.module.css";
import Button from "../Button/Button";
import InputButtonGroup from "../InputButtonGroup/InputButtonGroup";
import Trash from "../assets/trash.svg";
import ServiceDetailInput from "./ServiceDetailInput";
import { handleFormSubmit } from "./handleFormSubmit";

function ServiceAdd({
  setData,
  services,
  setServices,
  categories,
  servicesDetails,
  setServicesDetails,
}) {
  function handleElementSubmit(e) {
    e.preventDefault();
    setServices((prev) => [...prev, e.target.service.value]);
  }

  const [indexToRemove, setIndexToRemove] = useState(undefined);
  const [remove, setRemove] = useState(false);
  function handleRemoveClick(index) {
    if (servicesDetails[0]) {
      setServicesDetails((prev) =>
        prev.filter((el) => el !== servicesDetails[index])
      );
    }
    setServices((prev) => prev.filter((elem, i) => i !== index));
  }
  useEffect(() => {
    handleRemoveClick(indexToRemove);
  }, [remove]);

  return (
    <>
      <div className={styles.service_cat}>
        <h3>2. Services erstellen</h3>
        <InputButtonGroup
          handleElementSubmit={handleElementSubmit}
          placeholder="Service hinzufügen ..."
          name="service"
        />
        <div className={styles.service_list}>
          <div className={styles.group}>
            <div>Name</div>
            <div className={styles.select_category}>Kategorie</div>
            <div className={styles.heading}>Dauer</div>
            <div className={styles.heading}>Wartezeit</div>
            <div className={styles.heading}>Preis</div>
            <div className={styles.delete}>
              <Trash className={styles.icon} />
            </div>
          </div>
          <form
            action=""
            onSubmit={(e) => setData(handleFormSubmit(e, services))}
          >
            {services.map((el, index) => {
              return (
                <ServiceDetailInput
                  key={index}
                  name={el}
                  categories={categories}
                  setIndexToRemove={setIndexToRemove}
                  servicesDetails={servicesDetails[index]}
                  index={index}
                  setRemove={setRemove}
                />
              );
            })}
            <Button size="small" variant="secondary">
              Änderungen speichern
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ServiceAdd;
