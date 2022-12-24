import React from "react";
import styles from "./InfoElement.module.css";
import Right from "../assets/right-arrow.svg";
import Email from "../assets/email.svg";
import Phone from "../assets/phone.svg";
import Internet from "../assets/internet.svg";

function InfoElement(props) {
  const { infoHl, email, phone, internet, infoDetail, ...rest } = props;

  return (
    <div className={`${styles.info} `} {...rest}>
      <div className={styles.contact}>
        {email && <Email />}
        {phone && <Phone />}
        {internet && <Internet />}
        <div>
          <div className={styles.info_hl}>{infoHl}</div>
          <div className={styles.info_detail}>{infoDetail}</div>
        </div>
      </div>
      <Right />
    </div>
  );
}

export default InfoElement;
