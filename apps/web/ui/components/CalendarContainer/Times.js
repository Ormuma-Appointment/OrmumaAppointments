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
  console.log("COUCOU", selectedDay, selectedEmployee);

  console.log("eventData", eventData);
  let filteredEventData = eventData.filter((event) =>
    console.log("HERE", event.date.toDate(), props.date)
  );
  console.log("filteredEventData", filteredEventData);
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
  console.log("heyyy", selectedEmployee.workingTime[selectedDay].breakStart);
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

  //console.log(selectedEmployee);

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
    //date with start time in milliseconds
    // result + duration in milliseconds
    // trznsforme the result in date and time again

    const endTime = moment(startTime, "HH🇲🇲")
      .add(duration, "minutes")
      .format("HH:mm");
    return endTime;
  };

  let endTimeSlot = eventTime(event, chosenService.duration);
  //console.log("EVENNNNT", endTimeSlot);
  //let momentEvent = moment(event);
  //console.log("start time", momentEvent.add(2, "hours"));

  //const endEventTime = moment(event, "HH:ss")
  //  .add(chosenService.duration, "minutes")
  //  .format("HH:mm");

  // console.log(endEventTime, "endEventTime");
  //console.log("serivce duration", chosenService.duration);

  let selectedSlot = {
    slot: [event, endTimeSlot],
    start: event,
    date: props.date,
    duration: chosenService.duration,
    end: endTimeSlot,
  };
  console.log("selectedSlot", selectedSlot);

  useEffect(() => {
    if (event) {
      // console.log("ICI", eventTime(event, chosenService.duration));
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
