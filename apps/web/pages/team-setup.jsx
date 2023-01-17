import React from "react";
import Link from "next/link";
import styles from "../ui/page_styles/TeamSetup.module.css";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";
import CheckboxSelectElement from "../ui/components/CheckboxSelectElement/CheckboxSelectElement";
import TimeDefinitionSection from "../ui/components/TimeDefinitionSection/TimeDefinitionSection";
import Button from "../ui/components/Button/Button";

function TeamSetup() {
  return (
    <div>
      <div className={styles.breadcrumb}>
        <Link href="/store-setup">Store Setup</Link>{" "}
        <span className={styles.arrows}> &#9654;</span>{" "}
        <Link href="/service-setup">Services Konfgurieren </Link>{" "}
        <span className={styles.arrows}>&#9654;</span>{" "}
        <span className={styles.current_breadcrumb}>
          <Link href="/team-setup">Team konfigurieren </Link>
        </span>{" "}
        <span className={styles.arrows}>&#9654;</span>
      </div>
      <h1>Store Setup</h1>
      <CardContainer></CardContainer>
    </div>
  );
}

export default TeamSetup;
