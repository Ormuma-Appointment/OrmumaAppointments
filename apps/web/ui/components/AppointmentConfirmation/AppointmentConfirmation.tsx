import React from "react";
import styles from "./AppointmentConfirmation.module.css";
import { useAuthContext } from "../../../context/AuthContext";

interface AppointmentConfirmationProps {
  employee: string;
  store: string;
  start: string;
  date: string;
  client: string;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  employee,
  store,
  start,
  date,
  client,
}) => {
  const { isAdmin } = useAuthContext();
  let newDate = new Date(date);

  let shownDate = newDate.toLocaleDateString("de-DE");
  console.log();

  return (
    <div className={`container ${styles.confirmationContainer}`}>
      <h4>Buchung abgeschlossen!</h4>
      {isAdmin ? (
        <>
          <p>
            Du hast erfolgreich einen Termin für den Kunden <b>{client}</b> bei{" "}
            <b>{employee}</b> am <b>{shownDate}</b> um
            <b> {start} Uhr</b> gebucht.
          </p>
        </>
      ) : (
        <>
          <p>
            Du hast erfolgreich deinen Termin bei <b>{employee}</b> im Salon{" "}
            <b>{store}</b> am <b>{shownDate}</b> um
            <b> {start} Uhr</b> gebucht.
          </p>
        </>
      )}
      <p>
        Alle deine gebuchten Termine kannst du in deinem Account überprüfen und
        verwalten.
      </p>
    </div>
  );
};

export default AppointmentConfirmation;
