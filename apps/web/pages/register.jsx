import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "../ui/components/Button/Button";
import Link from "../ui/components/Link/Link";
import styles from "../ui/page_styles/Register.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const router = useRouter();
  const [err, setErr] = useState(false);

  const [salonName, setSalonName] = useState("Natur Friseur");
  // a function checks if both passwords are the same
  const isPasswordConfirmed = (password, confimPassword) => {
    if (password && confimPassword && password === confimPassword) return true;
    return false;
  };
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    let Vorname = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;
    let passwordPconfirm = e.target[3].value;
    console.log(Vorname, email, password);

    try {
      //if not the same password
      if (!isPasswordConfirmed(password, passwordPconfirm)) {
        // password is not matching, throws error
        setErr(true);

        console.error("passwords not matching ");
      } else {
        // otherwise a new userr is created
        setErr(false);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log(res);
        // a new user inside the users collection
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          Vorname,
          email,
        });
        // the user is redirected to the home page once the registration form is submited
        // using the useRouter hook from next as oppose to the useNavigate from react router dom
        router.push("/");
      }
    } catch (e) {
      setErr(true);
    }
  };

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
          type="password"
          id="password"
          placeholder="Passwort"
        />
        <input
          className={styles.input}
          type="password"
          id="password"
          placeholder="Passwort wiederholen"
        />
        <Button size="medium" variant="primary">
          Konto erstellen
        </Button>
        <span style={{ color: "red" }}>{err && "something is wrong"}</span>
      </form>
      <Link>Du hast bereits einen Account?</Link>
    </div>
  );
}

export default Register;
