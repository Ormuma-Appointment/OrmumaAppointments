import React from "react";
import styles from "./Button.module.css";
// import * as PropTypes from "prop-types";
import CalendarAdd from "../assets/calendar_add.svg";

interface ButtonProps {
  variant: string;
  size: string;
  icon: boolean | undefined;
  children: any;
}
const Button: React.FC<ButtonProps> = (props) => {
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
      {icon && <CalendarAdd className={styles.icon} />}
      {children}
    </button>
  );
};

// Button.propTypes = {
//   size: PropTypes.oneOf(["xsmall", "small", "medium"]),
// };

export default Button;
