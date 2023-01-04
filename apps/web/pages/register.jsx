import React, { useState } from "react";
import Button from "../ui/components/Button/Button";
import Link from "../ui/components/Link/Link";
import styles from "../ui/page_styles/Register.module.css";

function register() {
  const [salonName, setSalonName] = useState("Natur Friseur");
  function handleRegistrationSubmit(e) {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Willkommen bei {salonName}</h1>
        <p>Registriere dich, um alle Funktionen nutzen zu können</p>
      </div>
      <form className={styles.form} onSubmit={handleRegistrationSubmit}>
        <input
          className={styles.input}
          type="text"
          id="name"
          placeholder="Vorname"
        />

        <input
          className={styles.input}
          type="email"
          id="email"
          placeholder="Email-Adresse"
        />

        <input
          className={styles.input}
          type="text"
          id="password"
          placeholder="Passwort"
        />
        <input
          className={styles.input}
          type="text"
          id="password"
          placeholder="Passwort wiederholen"
        />
        <Button size="medium" variant="primary">
          Konto erstellen
        </Button>
      </form>
      <Link>Du hast bereits einen Account?</Link>
    </div>
  );
}

export default register;
