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
          <Link href="/register-admin" className={styles.link}>
            Partner werden
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
