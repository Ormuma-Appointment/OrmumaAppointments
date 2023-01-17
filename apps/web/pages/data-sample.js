//for infos in JS day of the week:
const weekday = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    birthDate: "1993-30-04",
  },
];

const admin = {
  name: "Natur frisseur",
  logo: "",
  contact: {
    email: "naturfriseur@gmail.com",
    telephone: "+49 1577 37384273",
    website: "www.naturfriseur-aachen.de",
  },
  address: {
    city: "Aachen",
    country: "Deutschland",
    name: "Naturfriseur Aachen",
    number: 11,
    postalCode: "52064",
    street: "Habsburgerallee",
  },
  openingHours: [
    {
      day: 0,
      label: "Sun",
      start: "0800",
      breakStart: "1200",
      breakEnd: "1300",
      end: "1500",
    },
    {
      day: 1,
      label: "Mon",
      start: "0800",
      breakStart: "1200",
      breakEnd: "1300",
      end: "1800",
    },
    {
      day: 2,
      label: "Tue",
      start: "0800",
      breakStart: "1200",
      breakEnd: "1300",
      end: "1800",
    },
    {
      day: 3,
      label: "Wed",
      start: "0800",
      breakStart: "1200",
      breakEnd: "1300",
      end: "1800",
    },
    {
      day: 4,
      label: "Thu",
      start: "0800",
      breakStart: "1200",
      breakEnd: "1300",
      end: "1800",
    },
    {
      day: 5,
      label: "Fri",
      start: "0800",
      breakStart: "1200",
      breakEnd: "1300",
      end: "1800",
    },
  ],
  services: [
    {
      service: "",
      categorie: "",
      duration: 30,
      waitingtime: "",
      price: "",
    },
  ],
  employees: [
    {
      name: "Marie",
      description: "",
      phone: "123",
      image: "",
      adress: {
        city: "Aachen",
        country: "Deutschland",
        number: 11,
        postalCode: "52064",
        street: "legiendammm",
      },
      services: {
        categorie: "Cutting & Styling",
        services: [
          { service: "style 1", price: "45€", duration: "30min" },
          { service: "style 2", price: "30€", duration: "30min" },
          { service: "style 3", price: "25€", duration: "30min" },
          { service: "style 4", price: "45€", duration: "30min" },
          { service: "style 5", price: "455€", duration: "30min" },
        ],
      },
      workingTime: [
        {
          day: 1,
          start: "0800",
          breakStart: "1200",
          breakEnd: "1300",
          end: "1500",
        },
      ],
      appointments: {
        date: ["timestampStart-timestampEnd", "timestamps", "timestamps"],
      },
    },
  ],
};

// when there in a appointment booked it's creating an event and delete the slot from the employee - add event to the user
const events = [
  {
    kind: "booking",
    start: "timestamp", //for the cards the timestamp can be tranforme to date and hours
    end: "timestamp",
    employee: 1, //employee_id
    customer: 1, //user_id
    service: "",
    duration: 45,
  },
];

//1. booking-service : it display the services from the admin datas
// The user select 1 service
// service added to a new object in events collection (array of objects)
//2. booking-employee : it filter in the admin data the employees and display the employees how can do the selected service
// the user select 1 of the filtered employees
// service added to the event object in the events collection
//3. booking-calendar: Propose the calendar the date available for these employees
//look inside the appointments of the employees if free or not
//display avaibilities possible with the duration of the event
// user select avaibilities, add start time and end time to the event object.
// add the appointment to the appointments the employee

// when booking add slot in appointments - it's not possible to book this slot anymore
//to see if it's have to be separete or in admin collection
// openings are created from the working time of the employee :

import React from "react";

const Datas = () => {
  //transform working hours to timeStamps from one working date

  //here with 15 min, but could be with service duration
  const minToMilliseconds = 15 * 60 * 1000; //900000
  console.log("minToMilliseconds", minToMilliseconds);

  const workingHoursToTimestamp = (array) => {
    //new Date(year, monthIndex, day, hours, minutes)
    console.log("appointment", array);

    let date = "";
  };

  admin.employees.forEach((employee) => {
    console.log("working", workingHoursToTimestamp(employee));
  });

  return <div>Page to test the data</div>;
};

export default Datas;
