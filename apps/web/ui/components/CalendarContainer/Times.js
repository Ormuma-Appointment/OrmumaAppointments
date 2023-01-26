import { useState, useContext, useEffect } from "react";
import styles from "./CalendarContainer.module.css";
import moment from "moment";
import { BookingContext } from "../../../context/BookingContext";

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

  const { chosenService, selectedEmployee, setChosenSlot } =
    useContext(BookingContext);

  //console.log(selectedEmployee.workingTime, "times employee");

  const displayInfo = (e) => {
    setInfo(true);
    setEvent(e.target.innerText);
  };

  //console.log("props date", props.date, props.date.getDay());
  let selectedDay = props.date.getDay();
  //let selectedDay = props.date.split("").slice(0, 2).join("");
  //console.log(selectedDay);
  // const x = {
  //   nextSlot: 45,
  //   breakTime: [
  //     ["11:00", "14:00"],
  //     ["16:00", "18:00"],
  //   ],
  //   startTime: "8:00",
  //   endTime: "20:00",
  // };

  //check with the date selected which date of the week is selected
  // inside x change the number dynamicly with the day of the week

  //check in the appointment of the employee if already have appoinment on this date, if yes add them to the break time

  const x = {
    nextSlot: chosenService.duration,
    breakTime: [
      [
        selectedEmployee.workingTime[selectedDay].breakStart,
        selectedEmployee.workingTime[selectedDay].breakEnd,
      ],
    ],
    startTime: selectedEmployee.workingTime[selectedDay].start,
    endTime: selectedEmployee.workingTime[selectedDay].end,
  };

  console.log(x);

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

  let selectedSlot = {
    start: event,
    date: props.date,
    duration: chosenService.duration,
    end: "start + DURATION",
  };
  console.log("selectedSlot", selectedSlot);

  useEffect(() => {
    if (event) {
      setChosenSlot(selectedSlot);
    }
  }, [event]);

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
