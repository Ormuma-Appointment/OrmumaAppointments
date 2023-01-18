import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import styles from "../ui/page_styles/Register.module.css";
import Button from "../ui/components/Button/Button";
import Link from "next/link";
import Input from "../ui/components/InputField/Input";
import { useAuthContext } from "../context/AuthContext";

function Login() {
  const [salonName, setSalonName] = useState("Natur Friseur");
  const [err, setErr] = useState(false);
  const router = useRouter();

  const { currentUser, setCurrentUser } = useAuthContext();
  console.log(currentUser, "current user from use context");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(password);

    try {
      // if (currentUser) {
      setErr(false);
      const res = await signInWithEmailAndPassword(auth, email, password);
      // Signed in
      router.push("/account");
      const user = res.userCredential.user;
      setCurrentUser(user);

      console.log(currentUser, "logout func");
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
      <Link className={styles.link} href="/register">
        Du hast noch keinen Account?
      </Link>
    </div>
  );
}

export default Login;
