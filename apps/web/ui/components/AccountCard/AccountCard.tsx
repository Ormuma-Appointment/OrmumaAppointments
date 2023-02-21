import RoundImage from "../RoundImage/RoundImage";
import styles from "./AccountCard.module.css";
import { useAuthContext } from "../../../context/AuthContext";

function AccountCard({ image = "/placeholder-profile.jpeg" }) {
  const { currentUser } = useAuthContext();
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.image}>
        <RoundImage
          alt={currentUser?.displayName}
          image={image}
          initialWidth={100}
        />
      </div>
      <div className={styles.info}>
        <div>{currentUser?.displayName || "user name"}</div>
        <div>{currentUser?.email || "email"}</div>
      </div>
    </div>
  );
}

export default AccountCard;
