import React from "react";
import styles from "./Footer.module.css";
import Facebook from "../assets/facebook.svg";
import Instagram from "../assets/instagram.svg";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.pagewidth}>
        <div>
          {/* <p className={styles.link}>Impressum</p>
          <p className={styles.link}>Datenschutz</p> */}
          <Link href="/register-admin" className={styles.link}>
            neuen Salon anmelden
          </Link>
        </div>
        <div>
          <Instagram className={styles.icon} />
          <Facebook className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
