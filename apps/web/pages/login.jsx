import React, { useState } from "react";
import Button from "../ui/components/Button/Button";
import Link from "../ui/components/Link/Link";
import styles from "../ui/page_styles/Register.module.css";

function login() {
  const [salonName, setSalonName] = useState("Natur Friseur");
  function handleLoginSubmit(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Willkommen bei {salonName}</h1>
        <p>Logge dich ein, um alle Funktionen nutzen zu können</p>
      </div>
      <form className={styles.form} onSubmit={handleLoginSubmit}>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          placeholder="Email-Adresse"
        />
        <input
          className={styles.input}
          type="text"
          id="password"
          name="password"
          placeholder="Passwort"
        />
        <Button size="medium" variant="primary">
          Konto erstellen
        </Button>
      </form>
      <Link>Du hast noch keinen Account?</Link>
    </div>
  );
}

export default login;
