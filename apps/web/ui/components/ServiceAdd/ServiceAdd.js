import React from "react";
import styles from "./ServiceAdd.module.css";
import Input from "../InputField/Input";
import Button from "../Button/Button";
import Minus from "../assets/minus.svg";
import Trash from "../assets/trash.svg";

function ServiceAdd({ setData, services, setServices, categories }) {
  function handleServiceSubmit(e) {
    e.preventDefault();
    setServices((prev) => [...prev, e.target.service.value]);
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    let newServices = services.reduce((result, service, index) => {
      let category = e.target.category[index].value;
      let duration = Number(e.target.duration[index].value);
      let waiting = Number(e.target.waiting[index].value);
      let price = Number(e.target.price[index].value);
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

  // function handleFormSubmit(e) {
  //   e.preventDefault();
  //   let serviceData = [];
  //   services.map((el, index) => {
  //     return (serviceData = [
  //       ...serviceData,
  //       {
  //         service: el,
  //         category: e.target.category[index].value,
  //         duration: Number(e.target.duration[index].value),
  //         waiting: Number(e.target.waiting[index].value),
  //         price: Number(e.target.price[index].value),
  //       },
  //     ]);
  //   });

  //   let newServices = serviceData.reduce((result, service) => {
  //     let category = service.category;
  //     if (!result[category]) {
  //       result[category] = {
  //         category: category,
  //         services: [],
  //       };
  //     }
  //     result[category].services.push({
  //       service: service.service,
  //       price: service.price,
  //       duration: service.duration,
  //       waiting: service.waiting,
  //     });
  //     return result;
  //   }, {});

  //   setData(Object.values(newServices));
  // }
  function handleRemoveClick(index) {
    setServices((prev) => prev.filter((elem, i) => i !== index));
  }
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
                <div className={styles.group} key={index}>
                  <div>{el}</div>
                  <select
                    name={`category`}
                    id="category"
                    className={styles.select_category}
                  >
                    {categories.map((elem, i) => {
                      return (
                        <option key={i} value={elem}>
                          {elem}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name="duration"
                    id="duration"
                    className={styles.select_things}
                  >
                    {[15, 30, 45, 60, 75, 90, 105, 120].map((elem, i) => {
                      return (
                        <option key={i} value={elem}>
                          {elem < 60 ? `${elem} mins` : `${elem / 60} h`}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name="waiting"
                    id="waiting"
                    className={styles.select_things}
                  >
                    {[0, 15, 30, 45, 60, 75, 90, 105, 120].map((elem, i) => {
                      return (
                        <option key={i} value={elem}>
                          {elem < 60 ? `${elem} mins` : `${elem / 60} h`}
                        </option>
                      );
                    })}
                  </select>
                  <Input name="price"></Input>
                  <div className={styles.delete}>
                    <Minus
                      className={styles.icon}
                      onClick={() => handleRemoveClick(index)}
                    />
                  </div>
                </div>
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
