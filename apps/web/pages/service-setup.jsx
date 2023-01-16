import React, { useState, useEffect } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";
import Button from "../ui/components/Button/Button";
import styles from "../ui/page_styles/ServiceSetup.module.css";
import Minus from "../ui/components/assets/minus.svg";

function ServiceSetup() {
  const [categories, setCategories] = useState([]);
  function handleCatSubmit(e) {
    e.preventDefault();
    setCategories((prev) => [...prev, e.target.category.value]);
  }
  function handleRemoveClick(el) {
    console.log(el);
    setCategories((prev) => prev.filter((elem) => elem !== el));
  }

  useEffect(() => {
    console.log(categories);
  }, [categories]);
  return (
    <div>
      <h1>Services Konfigurieren</h1>
      <CardContainer>
        <div className={styles.intro}>
          Setting up services happens in 2 steps:
          <ol>
            <li>
              create the categories for your services (this will make it easier
              for your customers to choose the right service){" "}
            </li>
            <li>
              add the service and select the category, duration, waiting time
              and price for that service.
            </li>
          </ol>
        </div>
        <div className={styles.service_cat}>
          <h3>1. Service Kategorien erstellen</h3>
          <form className={styles.input_group} onSubmit={handleCatSubmit}>
            <Input placeholder="Kategorie hinzufügen ..." name="category" />{" "}
            <Button icon="" size="medium" variant="primary">
              + hinzufügen
            </Button>
          </form>
          <div className={styles.cat_box}>
            {categories.map((el, index) => {
              return (
                <div className={styles.pill}>
                  {el}{" "}
                  <Minus
                    className={styles.icon}
                    onClick={() => handleRemoveClick(el)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </CardContainer>
    </div>
  );
}

export default ServiceSetup;
