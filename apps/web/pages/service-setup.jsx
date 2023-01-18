import React, { useState, useEffect } from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";
import Button from "../ui/components/Button/Button";
import styles from "../ui/page_styles/ServiceSetup.module.css";
import ServiceAdd from "../ui/components/ServiceAdd/ServiceAdd";
import Minus from "../ui/components/assets/minus.svg";
import Link from "next/link";

function ServiceSetup() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [data, setData] = useState([]);
  function handleCatSubmit(e) {
    e.preventDefault();
    setCategories((prev) => [...prev, e.target.category.value]);
  }
  function handleRemoveClick(index) {
    setCategories((prev) => prev.filter((elem, i) => i !== index));
  }
  function handleSaveClick(e) {
    e.preventDefault();
    let serviceObj = data;
    console.log(serviceObj);
  }
  return (
    <div>
      <div className={styles.breadcrumb}>
        <Link href="/store-setup">Store Setup</Link>{" "}
        <span className={styles.arrows}> &#9654;</span>{" "}
        <span className={styles.current_breadcrumb}>
          <Link href="/service-setup">Services Konfgurieren </Link>{" "}
        </span>{" "}
        <span className={styles.arrows}>&#9654;</span>{" "}
        <Link href="/team-setup">Team konfigurieren </Link>
        <span className={styles.arrows}>&#9654;</span>
      </div>
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
              <Button icon="" size="medium" variant="secondary">
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
                      onClick={() => handleRemoveClick(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <ServiceAdd
            setData={setData}
            services={services}
            setServices={setServices}
            categories={categories}
          />
          <div className={styles.footer}>
            <Button size="medium" variant="danger">
              zurück
            </Button>
            <Button size="medium" variant="primary" onClick={handleSaveClick}>
              speichern & weiter
            </Button>
          </div>
        </div>
      </CardContainer>
    </div>
  );
}

export default ServiceSetup;
