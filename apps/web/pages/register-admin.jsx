import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "../ui/components/Button/Button";
import Input from "../ui/components/InputField/Input";
import Link from "next/link";
import styles from "../ui/page_styles/Register.module.css";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";

function RegisterAdmin() {
  const router = useRouter();
  const { currentUser, isAdmin } = useAuthContext();
  if (currentUser && !isAdmin) {
    router.push("/account");
  } else if (currentUser && isAdmin) {
    router.push("/account-admin");
  }
  const [err, setErr] = useState(false);
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

        // a new user inside the users collection
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          isAdmin: true,
        });
        await updateProfile(res.user, {
          displayName,
        });
        handleAdminRegistration(email);
        router.push("/registration-confirmation");
        // the user is redirected to the home page once the registration form is submited
        // using the useRouter hook from next as oppose to the useNavigate from react router dom
      }
    } catch (e) {
      setErr(true);
    }
  };
  // add admin claim to user
  const handleAdminRegistration = async (email) => {
    // call firebase cloud function endpoint
    const endpoint = `https://us-central1-appointment---web-app.cloudfunctions.net/makeAdmin`;
    const data = { email };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(endpoint, options);
      const json = await response.json();
      if (json.message) {
        // console.log("User has been made an admin", json.message);
      } else {
        // console.log("making the user an admin has failed");
      }
    } catch (err) {
      console.log("making the user an admin has failed", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Willkommen</h1>
        <p>Registriere dich, um Kund*Innen online Termine buchen zu lassen.</p>
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
      <Link className={styles.link} href="/login">
        Du bist Kunde?
      </Link>
    </div>
  );
}

export default RegisterAdmin;
