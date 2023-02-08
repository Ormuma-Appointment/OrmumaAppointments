import CardContainer from "../CardContainer/CardContainer";
import styles from "./AppointmentConfirmation.module.css";
import { useAuthContext } from "../../../context/AuthContext";

const AppointmentConfirmation = ({ employee, store, start, date, client }) => {
  const { isAdmin } = useAuthContext();
  let newDate = new Date(date);

  let shownDate = newDate.toLocaleDateString("de-DE");
  console.log();
  return (
    <CardContainer>
      <div className={styles.confirmationContainer}>
        <h4>Buchung abgeschlossen!</h4>
        {isAdmin ? (
          <>
            <p>
              Du hast erfolgreich einen Termin für den Kunden <b>{client}</b>{" "}
              bei <b>{employee}</b> am <b>{shownDate}</b> um
              <b> {start}Uhr</b> gebucht.
            </p>
          </>
        ) : (
          <>
            <p>
              Du hast erfolgreich deinen Termin bei <b>{employee}</b> im Salon{" "}
              <b>{store}</b> am <b>{shownDate}</b> um
              <b> {start}Uhr</b> gebucht.
            </p>
          </>
        )}
        <p>
          Alle deine gebuchten Termine kannst du in deinem Account überprüfen
          und verwalten.
        </p>
      </div>
    </CardContainer>
  );
};

export default AppointmentConfirmation;
