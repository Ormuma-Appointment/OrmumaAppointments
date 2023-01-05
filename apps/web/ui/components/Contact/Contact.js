import React from "react";
import styles from "./Contact.module.css";
import CardContainer from "../CardContainer/CardContainer";
import InfoElement from "../InfoElement/InfoElement";

function Contact() {
  return (
    <CardContainer>
      <InfoElement email infoDetail="naturfriseur@gmail.com" infoHl="Email" />
      <InfoElement
        infoDetail="www.naturfriseur-aachen.de"
        infoHl="Website"
        internet
      />
      <InfoElement infoDetail="+49 1577 37384273" infoHl="Telefon" phone />
    </CardContainer>
  );
}

export default Contact;
