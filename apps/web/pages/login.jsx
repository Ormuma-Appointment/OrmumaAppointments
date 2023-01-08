import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";

import Button from "../ui/components/Button/Button";
import Link from "../ui/components/Link/Link";
import styles from "../ui/page_styles/Register.module.css";
import { auth, db } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function login() {
  const [salonName, setSalonName] = useState("Natur Friseur");
  const [err, setErr] = useState(false);
  const router = useRouter();

  const { currentUser } = useAuthContext();
  console.log(currentUser, "current user from use context");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    console.log(password);

    try {
      if (currentUser) {
        setErr(false);
        const res = await signInWithEmailAndPassword(auth, email, password);
        router.push("/");
        // Signed in
        const user = res.userCredential.user;
        // console.log(user);
        // . . .
      }
    } catch (e) {
      setErr(true);
      console.error("somthing is wrong ");
      // console.log("errrrroorrr");
    }
  };

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
