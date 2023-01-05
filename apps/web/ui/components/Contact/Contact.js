import React from "react";
import styles from "./Contact.module.css";
import CardContainer from "../CardContainer/CardContainer";
import InfoElement from "../InfoElement/InfoElement";

function Contact({
  email = "naturfriseur@gmail.com",
  website = "www.naturfriseur-aachen.de",
  telephone = "+49 1577 37384273",
}) {
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

export default Contact;
