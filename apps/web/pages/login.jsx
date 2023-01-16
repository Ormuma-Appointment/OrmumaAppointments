import React, { useState } from "react";
import styles from "../ui/page_styles/Register.module.css";
import Button from "../ui/components/Button/Button";
import Link from "../ui/components/Link/Link";
import Input from "../ui/components/InputField/Input";

function login() {
  const [salonName, setSalonName] = useState("Natur Friseur");
  function handleLoginSubmit(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    console.log(password);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Willkommen bei {salonName}</h1>
        <p>Logge dich ein, um alle Funktionen nutzen zu können</p>
      </div>
      <form className={styles.form} onSubmit={handleLoginSubmit}>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email-Adresse"
          email
        />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          password
        />

        <Button size="medium" variant="primary">
          Anmelden
        </Button>
      </form>
      <Link>Du hast noch keinen Account?</Link>
    </div>
  );
}

export default login;
