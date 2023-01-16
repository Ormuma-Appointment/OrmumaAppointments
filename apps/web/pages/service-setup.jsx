import React, { useState, useEffect } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";
import Button from "../ui/components/Button/Button";
import SelectElement from "../ui/components/SelectElement/SelectElement";
import styles from "../ui/page_styles/ServiceSetup.module.css";
import Minus from "../ui/components/assets/minus.svg";

function ServiceSetup() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  function handleCatSubmit(e) {
    e.preventDefault();
    setCategories((prev) => [...prev, e.target.category.value]);
  }
  function handleRemoveClick(el) {
    console.log(el);
    setCategories((prev) => prev.filter((elem) => elem !== el));
  }
  function handleServiceSubmit(e) {
    e.preventDefault();
    setServices((prev) => [...prev, e.target.service.value]);
  }

  useEffect(() => {
    console.log(services);
  }, [services]);
  return (
    <div>
      <h1>Services Konfigurieren</h1>
      <CardContainer>
        <div className={styles.container}>
          <div className={styles.intro}>
            Erstellen Sie Ihren Service Katalog in 2 einfachen Schritten:
            <ol>
              <li>
                Fügen Sie Kategorien hinzu (diese erleichtern es Ihren
                Kund*innen den richtigen Service zu finden)
              </li>
              <li>
                fügen Sie Services hinzu, wählen Sie die dazugehörigen Kateogrie
                und geben Sie Dauer, Wartezeit und Preis für jeden Service an.
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
                  <div key={index} className={styles.pill}>
                    {el}
                    <Minus
                      className={styles.icon}
                      onClick={() => handleRemoveClick(el)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.service_cat}>
            <h3>2. Services erstellen</h3>
            <form className={styles.input_group} onSubmit={handleServiceSubmit}>
              <Input placeholder="Service hinzufügen ..." name="service" />{" "}
              <Button icon="" size="medium" variant="primary">
                + hinzufügen
              </Button>
            </form>
            <div className={styles.service_list}>
              {services.map((el, index) => {
                return (
                  <div className={styles.group} key={index}>
                    <div>{el}</div>
                    <SelectElement name={`${index}category`} id="category">
                      {categories.map((elem, i) => {
                        return (
                          <option key={i} value={elem}>
                            {elem}
                          </option>
                        );
                      })}
                    </SelectElement>
                    <SelectElement name={`${index}duration`} id="duration">
                      {[15, 30, 45, 60, 75, 90, 105, 120].map((elem, i) => {
                        return (
                          <option key={i} value={elem}>
                            {elem < 60 ? `${elem} mins` : `${elem / 60} h`}
                          </option>
                        );
                      })}
                    </SelectElement>
                    <SelectElement name={`${index}waiting`} id="duration">
                      {[0, 15, 30, 45, 60, 75, 90, 105, 120].map((elem, i) => {
                        return (
                          <option key={i} value={elem}>
                            {elem < 60 ? `${elem} mins` : `${elem / 60} h`}
                          </option>
                        );
                      })}
                    </SelectElement>
                    <Input></Input>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.footer}>
            <Button size="medium" variant="danger">
              zurück
            </Button>
            <Button size="medium" variant="primary">
              weiter
            </Button>
          </div>
        </div>
      </CardContainer>
    </div>
  );
}

export default ServiceSetup;
