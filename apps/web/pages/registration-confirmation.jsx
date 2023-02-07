import React from "react";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import styles from "../ui/page_styles/RegisterConfirmation.module.css";

function RegistrationConfirmation() {
  return (
    <CardContainer>
      <div className={styles.container}>
        <h1>Danke für deine Anmeldung</h1>
        <p>Bald kannst du die Funktionen unserer Webseite nutzen.</p>
        <p>Aber zunächst prüfe deine Emails und bestätige deine Anmeldung!</p>
      </div>
    </CardContainer>
  );
}

export default RegistrationConfirmation;
