import React from "react";
import styles from "./Button.module.css";
import * as PropTypes from "prop-types";
import Calendar from "../assets/calendar.svg";

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
      {icon && <Calendar className={styles.icon} />}
      {children}
    </button>
  );
}

Button.propTypes = {
  size: PropTypes.oneOf(["xsmall", "small", "medium"]),
};

export default Button;
