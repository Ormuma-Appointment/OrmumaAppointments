import React from "react";
import styles from "./InfoElement.module.css";
import Right from "../assets/right-arrow.svg";
import Email from "../assets/email.svg";
import Phone from "../assets/phone.svg";
import Internet from "../assets/internet.svg";

function InfoElement(props) {
  const { infoHl, email, phone, internet, infoDetail, ...rest } = props;

  return (
    <div className={`${styles.container} `} {...rest}>
      <div className={styles.contact}>
        {email && <Email className={styles.icon} />}
        {phone && <Phone className={styles.icon} />}
        {internet && <Internet className={styles.icon} />}
        <div>
          <div className={styles.info_hl}>{infoHl}</div>
          <div className={styles.info_detail}>{infoDetail}</div>
        </div>
      </div>
      <Right className={styles.arrow_icon} />
    </div>
  );
}

export default InfoElement;
