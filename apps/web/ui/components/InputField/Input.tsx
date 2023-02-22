import styles from "./Input.module.css";
import User from "../assets/account1.svg";
import Email from "../assets/email.svg";
import Password from "../assets/password.svg";

interface InputProps {
  defaultValue?: string | number;
  placeholder: string;
  name?: string;
  user?: boolean;
  password?: boolean;
  email?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const { user, password, email, placeholder, defaultValue, ...rest } = props;
  return (
    <div className={styles.container}>
      {(user || email || password) && (
        <div className={styles.iconfield}>
          {user && <User className={styles.icon} />}
          {email && <Email className={styles.icon} />}
          {password && <Password className={styles.icon} />}
        </div>
      )}
      <input
        type={password ? "password" : "text"}
        className={
          user || email || password
            ? `${styles.input}`
            : `${styles.input} ${styles.noicon}`
        }
        {...rest}
        placeholder={placeholder}
        defaultValue={defaultValue ? defaultValue : ""}
      />
    </div>
  );
};

export default Input;
