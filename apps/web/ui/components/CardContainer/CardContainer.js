import React from "react";
import styles from "./CardContainer.module.css";

function CardContainer(props) {
  const { children, ...rest } = props;
  return <div className={styles.container}>{children}</div>;
}

export default CardContainer;
