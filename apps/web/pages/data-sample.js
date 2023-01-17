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

let users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    birthDate: "1993-30-04",
    nextAppointments: [],
    lastAppointments: [],
  },
];

const admin = {
  name: "Natur frisseur",
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
      start: "0800",
      end: "1500",
    },
    {
      day: 1,
      start: "0800",
      end: "1800",
    },
    {
      day: 2,
      start: "0800",
      end: "1800",
    },
    {
      day: 3,
      start: "0800",
      end: "1800",
    },
    {
      day: 4,
      start: "0800",
      end: "1800",
    },
    {
      day: 5,
      start: "0800",
      end: "1800",
    },
  ],
  services: [
    {
      service: "",
      categorie: "",
      duration: "in timeStamps",
      waitingtime: "",
      price: "",
    },
  ],
  employees: [
    {
      name: "Marie",
      adress: {
        city: "Aachen",
        country: "Deutschland",
        number: 11,
        postalCode: "52064",
        street: "legiendammm",
      },
      phone: "123",
      image: "",
      services: ["blabla", "ddddd"],
      workingTime: [{ day: "saturday", start: "0800", end: "1500" }],
      appointments: { date: ["timestamps", "timestamps", "timestamps"] },
    },
  ],
};

// when there in a appointment booked it's creating an event and delete the slot from the employee - add event to the user
const events = [
  {
    kind: "booking",
    start: "2020-01-03 12:00",
    end: "2020-01-03 12:30",
    employee: "name",
    customer: "",
    style: "",
  },
];

// when booking add slot in appointments - it's not possible to book there anymore
//to see if it's have to be separete or in admin collection
// openings are created from the working time of the employee :
//I don't really know if we should already cut them in slot or if we should start with 30 min slots
// appointment should be integrate inside admin when we will have the logic

//1. The user select 1 service and it filter in the admin employee the employees how can do this service
//2. The use can choose one of the filtered employee.
//3. Propose the calendar the date available for these employees -> look inside the appointments of the employees if free or not
//4. Add the appointment to the appointms of the employee
import React from "react";

const Datas = () => {
  //transform working hours to timeStamps from one working date
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
