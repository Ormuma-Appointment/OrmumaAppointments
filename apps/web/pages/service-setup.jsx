import React from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";
import Button from "../ui/components/Button/Button";
import styles from "../ui/page_styles/ServiceSetup.module.css";

function ServiceSetup() {
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
          <div className={styles.input_group}>
            <Input placeholder="Kategorie hinzufügen ..." />{" "}
            <Button icon="" size="medium" variant="primary">
              + hinzufügen
            </Button>
          </div>
        </div>
      </CardContainer>
    </div>
  );
}

export default ServiceSetup;
