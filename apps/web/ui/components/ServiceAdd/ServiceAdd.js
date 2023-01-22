import React, { useEffect, useState } from "react";
import styles from "./ServiceAdd.module.css";
import Input from "../InputField/Input";
import Button from "../Button/Button";
import Trash from "../assets/trash.svg";
import ServiceDetailInput from "./ServiceDetailInput";

function ServiceAdd({
  setData,
  services,
  setServices,
  categories,
  servicesDetails,
  setServicesDetails,
}) {
  function handleServiceSubmit(e) {
    e.preventDefault();
    setServices((prev) => [...prev, e.target.service.value]);
  }

  console.log("servicesDetails ", servicesDetails);
  function handleFormSubmit(e) {
    e.preventDefault();
    let newServices = services.reduce((result, service, index) => {
      let category = e.target.category[index].value;
      let duration = Number(e.target.duration[index].value);
      let waiting = Number(e.target.waiting[index].value);
      let price;
      if (index === 0) {
        price = Number(e.target.price.value);
      } else {
        price = Number(e.target.price[index].value);
      }
      let serviceData = { service, price, duration, waiting };
      let categoryData = result.find((cat) => cat.category === category);
      if (!categoryData) {
        categoryData = { category, services: [] };
        result.push(categoryData);
      }
      categoryData.services.push(serviceData);
      return result;
    }, []);
    setData(newServices);
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

  useEffect(() => {
    console.log(services);
  }, [services]);

  return (
    <>
      <div className={styles.service_cat}>
        <h3>2. Services erstellen</h3>
        <form className={styles.input_group} onSubmit={handleServiceSubmit}>
          <Input placeholder="Service hinzufügen ..." name="service" />{" "}
          <Button icon="" size="medium" variant="secondary">
            + hinzufügen
          </Button>
        </form>
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
          <form action="" onSubmit={handleFormSubmit}>
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
