import { useState } from "react";
import styles from "./CalendarContainer.module.css";

const time = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "14:00",
  "15:00",
  "17:00",
];

const Times = (props) => {
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);

  const displayInfo = (e) => {
    setInfo(true);
    setEvent(e.target.innerText);
  };

  return (
    <div className={styles.times}>
      {time.map((times) => {
        return (
          <div>
            <button onClick={(e) => displayInfo(e)}> {times} </button>
          </div>
        );
      })}
      <div>
        {info
          ? `Your appointment is set to ${event} ${props.date.toDateString()}`
          : null}
      </div>
    </div>
  );
};

export default Times;
