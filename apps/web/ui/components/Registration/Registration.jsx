import React, { useState } from "react";
import CardContainer from "../CardContainer/CardContainer";
import Button from "../Button/Button";
import styles from "./Registration.module.css";

function Registration() {
  const [email, setEmail] = useState(null);
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  return (
    <CardContainer>
      <form action="" className={styles.form}>
        <label htmlFor="email">Email</label>
        <input type="text" onChange={handleEmailChange} id="email" />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" />
        <Button size="medium" variant="primary">
          Konto erstellen
        </Button>
      </form>
    </CardContainer>
  );
}

export default Registration;
