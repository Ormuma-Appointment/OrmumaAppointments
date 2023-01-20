import { useState } from "react";
import Calendar from "react-calendar";
//import "react-calendar/dist/Calendar.css";
import styles from "./CalendarContainer.module.css";
import { StyledCalendar } from "./StyledCalendar";

const CalendarContainer = () => {
  // 1.we use useStage to store a date and we set the current date as its initial value with JavaScript date object
  const [date, setDate] = useState(new Date());
  return (
    <div className={styles.app}>
      <div className={styles.calendarContainer}>
        {/* 2.when user selects a date the valuue of the date will be set to the user selected date*/}
        <StyledCalendar onChange={setDate} value={date} />
      </div>
      <div className={styles.textCenter}>
        {/* 3.the value selected by the user is printed*/}
        Selected date : {date.toDateString()}
      </div>
    </div>
  );
};

export default CalendarContainer;
