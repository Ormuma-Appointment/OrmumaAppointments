import CardContainer from "../CardContainer/CardContainer";
import styles from "./AppointmentConfirmation.module.css";

const AppointmentConfirmation = () => {
  return (
    <CardContainer>
      <div className={styles.confirmationContainer}>
        <h4>Appointment booked!</h4>
        <p>
          You have a few more steps to go through to finish the registration
          process.
        </p>
        <p>
          <b>
            Please check your email inbox and click on the link emailed to you.
          </b>
        </p>
      </div>
    </CardContainer>
  );
};

export default AppointmentConfirmation;
