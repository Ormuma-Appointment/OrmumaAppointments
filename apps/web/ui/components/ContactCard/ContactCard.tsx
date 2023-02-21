import React from "react";
import styles from "./ContactCard.module.css";
import CardContainer from "../CardContainer/CardContainer";
import InfoElement from "../InfoElement/InfoElement";

interface ContactCardProps {
  email: string;
  website: string;
  telephone: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  email,
  website,
  telephone,
}) => {
  return (
    <CardContainer>
      <div className={styles.container}>
        <InfoElement infoDetail={email} infoHl="Email" email />
        <InfoElement infoDetail={website} infoHl="Website" internet />
        <InfoElement infoDetail={telephone} infoHl="Telefon" phone />
      </div>
    </CardContainer>
  );
};

export default ContactCard;
