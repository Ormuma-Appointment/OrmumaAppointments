import { useState, useContext, useEffect } from "react";
import styles from "./CalendarContainer.module.css";
import moment from "moment";
import { BookingContext } from "../../../context/BookingContext";

const Times = (props) => {
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);

  const { chosenService, selectedEmployee, setChosenSlot, eventData } =
    useContext(BookingContext);

  const displayInfo = (e) => {
    setInfo(true);
    setEvent(e.target.innerText);
  };

  let selectedDay = props.date.getDay();

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

  eventData.forEach((event) => {
    if (
      moment(event.date.toDate()).format("YYYY-MM-DD") ===
      moment(props.date).format("YYYY-MM-DD")
    ) {
      x.breakTime.push(event.slot);
    }
  });

  console.log("x", x);

  let slotTime = moment(x.startTime, "HH:mm");
  let endTime = moment(x.endTime, "HH:mm");

  function isInBreak(slotTime, breakTimes) {
    if (breakTimes !== null) {
      return breakTimes.some((br) => {
        return (
          slotTime >= moment(br[0], "HH:mm") &&
          slotTime < moment(br[1], "HH:mm")
        );
      });
    } else {
      console.log("coucou");
    }
  }

  let times = [];
  while (slotTime < endTime) {
    if (!isInBreak(slotTime, x.breakTime)) {
      times.push(slotTime.format("HH:mm"));
    }
    slotTime = slotTime.add(x.nextSlot, "minutes");
  }

  const eventTime = (startTime, duration) => {
    const endTime = moment(startTime, "HH:mm")
      .add(duration, "minutes")
      .format("HH:mm");
    return endTime;
  };

  let endTimeSlot = eventTime(event, chosenService.duration);

  let selectedSlot = {
    slot: [event, endTimeSlot],
    start: event,
    date: props.date,
    duration: chosenService.duration,
    end: endTimeSlot,
  };

  useEffect(() => {
    if (event) {
      setChosenSlot(selectedSlot);
    }
  }, [event]);

  return (
    <div className={styles.times}>
      {times.map((times, index) => {
        return (
          <div key={index}>
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
