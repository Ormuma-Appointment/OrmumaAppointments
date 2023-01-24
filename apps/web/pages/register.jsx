import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "../ui/components/Button/Button";
import Input from "../ui/components/InputField/Input";
import Link from "next/link";
import styles from "../ui/page_styles/Register.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";

function Register() {
  const router = useRouter();
  const [err, setErr] = useState(false);
  const { register } = useAuthContext();

  const [salonName, setSalonName] = useState("Natur Friseur");
  // a function checks if both passwords are the same
  const isPasswordConfirmed = (password, confimPassword) => {
    if (password && confimPassword && password === confimPassword) return true;
    return false;
  };
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    let displayName = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.passwordP.value;
    let passwordPconfirm = e.target.passwordrepeat.value;

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
          displayName,
          email,
        });
        await updateProfile(res.user, {
          displayName,
        });
        router.push("/account");
        // the user is redirected to the home page once the registration form is submited
        // using the useRouter hook from next as oppose to the useNavigate from react router dom
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
        <Input type="text" id="name" name="name" placeholder="Vorname" user />
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
          name="passwordP"
          placeholder="Password"
          password
        />
        <Input
          type="password"
          id="passwordrepeat"
          name="passwordrepeat"
          placeholder="Password wiederholen"
          password
        />
        <Button size="medium" variant="primary">
          Konto erstellen
        </Button>
        <span style={{ color: "red" }}>{err && "something is wrong"}</span>
      </form>
      <Link className={styles.link} href="/login">
        Du hast bereits einen Account?
      </Link>
    </div>
  );
}

export default Register;
