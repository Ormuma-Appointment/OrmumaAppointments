import { useState } from "react";
import styles from "./CalendarContainer.module.css";
import { StyledCalendar } from "./StyledCalendar";
import Time from "./Time";

const CalendarContainer = () => {
  // 1.we use useStage to store a date and we set the current date as its initial value with JavaScript date object
  const [date, setDate] = useState(new Date());
  //3. store the initial value of showtime as false
  const [showTime, setShowTime] = useState(false);
  return (
    <div className={styles.app}>
      <div className={styles.calendarContainer}>
        {/* 2.when user selects a date the valuue of the date will be set to the user selected date
        4. onClickDay setShow time to true when a day is clicked*/}
        <StyledCalendar
          onChange={setDate}
          value={date}
          onClickDay={() => setShowTime(true)}
          minDate={new Date()}
          maxDetail="month"
        />
      </div>
      {date.length > 0 ? (
        <p>
          <span>Start:</span>
          {date[0].toDateString()}
          &nbsp; &nbsp;
          <span>End:</span>
          {date[1].toDateString()}
        </p>
      ) : (
        <p>
          <span>Default selected date:</span>
          {date.toDateString()}
        </p>
      )}
      <div className={styles.textCenter}>
        {/* 5.Time display the time slot when the value showtime chqnges to true with dqte as props of time component*/}
        <Time showTime={showTime} date={date} />
      </div>
    </div>
  );
};

export default CalendarContainer;
