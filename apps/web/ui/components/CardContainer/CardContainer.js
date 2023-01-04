import React from "react";
import styles from "./CardContainer.module.css";

function CardContainer(props) {
  const { children, ...rest } = props;
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>{children}</div>
    </div>
  );
}

export default CardContainer;
