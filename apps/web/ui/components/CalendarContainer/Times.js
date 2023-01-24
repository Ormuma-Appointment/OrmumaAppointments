import { useState } from "react";
import styles from "./CalendarContainer.module.css";
import moment from "moment";

// const time = [
//   "08:00",
//   "08:30",
//   "09:00",
//   "09:30",
//   "10:00",
//   "14:00",
//   "15:00",
//   "17:00",
// ];

const Times = (props) => {
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);

  const displayInfo = (e) => {
    setInfo(true);
    setEvent(e.target.innerText);
  };

  const x = {
    nextSlot: 45,
    breakTime: [
      ["11:00", "14:00"],
      ["16:00", "18:00"],
    ],
    startTime: "8:00",
    endTime: "20:00",
  };

  let slotTime = moment(x.startTime, "HH:mm");
  let endTime = moment(x.endTime, "HH:mm");

  function isInBreak(slotTime, breakTimes) {
    return breakTimes.some((br) => {
      return (
        slotTime >= moment(br[0], "HH:mm") && slotTime < moment(br[1], "HH:mm")
      );
    });
  }

  let times = [];
  while (slotTime < endTime) {
    if (!isInBreak(slotTime, x.breakTime)) {
      times.push(slotTime.format("HH:mm"));
    }
    slotTime = slotTime.add(x.nextSlot, "minutes");
  }

  return (
    <div className={styles.times}>
      {times.map((times) => {
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
