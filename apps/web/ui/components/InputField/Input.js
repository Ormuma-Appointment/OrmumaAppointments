import styles from "./Input.module.css";
import User from "../assets/user.svg";

function Input(props) {
  const { size = "medium_input", icon, ...rest } = props;
  return (
    <input
      type="text"
      className={`${styles.input} ${styles[size]}`}
      {...rest}
      placeholder={size}
    />
  );
}

export default Input;

// Test icon input not working
//<input
//  type="text"
//  className={`${styles.input} ${styles[size]}`}
//  {...rest}
//  placeholder={size && <User className={styles.icon} />}
///>;
