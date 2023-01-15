import React from "react";
import styles from "./ContactCard.module.css";
import CardContainer from "../CardContainer/CardContainer";
import InfoElement from "../InfoElement/InfoElement";

function ContactCard({ email, website, telephone }) {
  return (
    <CardContainer>
      <div className={styles.container}>
        <InfoElement email infoDetail={email} infoHl="Email" />
        <InfoElement infoDetail={website} infoHl="Website" internet />
        <InfoElement infoDetail={telephone} infoHl="Telefon" phone />
      </div>
    </CardContainer>
  );
}

export default ContactCard;
