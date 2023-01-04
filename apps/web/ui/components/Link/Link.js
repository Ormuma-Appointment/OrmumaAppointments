import React from "react";
import styles from "./Link.module.css";

function Link(props) {
  const { children = "Click here", ...rest } = props;

  return (
    <a className={`${styles.link}`} {...rest}>
      {children}
    </a>
  );
}

export default Link;
