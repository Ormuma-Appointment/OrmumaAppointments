import React from "react";
import styles from "./Button.module.css";
import "../../../../apps/web/globals.css";
import * as PropTypes from "prop-types";

function Button(props) {
  const {
    variant = "primary",
    size = "medium",
    children,
    icon,
    ...rest
  } = props;

  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      {...rest}
    >
      {icon && <img src={icon} alt="icon" className={styles.icon} />}
      {children}
    </button>
  );
}

Button.propTypes = {
  size: PropTypes.oneOf(["xsmall", "small", "medium"]),
};

export default Button;
