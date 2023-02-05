import CardContainer from "../CardContainer/CardContainer";
import styles from "./AppointmentConfirmation.module.css";

const AppointmentConfirmation = ({ employee, store, start, date }) => {
  let newDate = new Date(date);
  let shownDate = newDate.toLocaleDateString("de-DE");
  console.log();
  return (
    <CardContainer>
      <div className={styles.confirmationContainer}>
        <h4>Buchung abgeschlossen!</h4>
        <p>
          Du hast erfolgreich deinen Termin bei <b>{employee}</b> im Salon{" "}
          <b>{store}</b> am <b>{shownDate}</b> um
          <b> {start}Uhr</b> gebucht.
        </p>
        <p>
          Alle deine gebuchten Termine kannst du in deinem Account überprüfen
          und verwalten.
        </p>
      </div>
    </CardContainer>
  );
};

export default AppointmentConfirmation;
