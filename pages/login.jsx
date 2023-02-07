import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "../ui/page_styles/Register.module.css";
import Button from "../ui/components/Button/Button";
import Link from "next/link";
import Input from "../ui/components/InputField/Input";
import { useAuthContext } from "../context/AuthContext";

function Login() {
  const [err, setErr] = useState(false);
  const router = useRouter();

  const { currentUser, setCurrentUser, isAdmin } = useAuthContext();
  if (currentUser && !isAdmin) {
    router.push("/account");
  } else if (currentUser && isAdmin) {
    router.push("/account-admin");
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // if (currentUser) {
      setErr(false);
      const res = await signInWithEmailAndPassword(auth, email, password);
      // Signed in

      const user = res.userCredential.user;
      setCurrentUser(user);

      console.log(currentUser, "logout func");
      if (isAdmin) {
        router.push("/account-admin");
      } else {
        router.push("/account");
      }
    } catch (e) {
      setErr(true);
      console.error("somthing is wrong ", e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Willkommen bei Salounge</h1>
        <p>
          Logge dich ein, um Termine bei deinem Lieblingssalon buchen zu können.
        </p>
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
