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
      day: "Monday",
      end: "18:00",
      start: "08:00",
    },
    {
      day: "Tuesday",
      end: "18:00",
      start: "08:00",
    },
    {
      day: "Wednesday",
      end: "18:00",
      start: "08:00",
    },
    {
      day: "Thursday",
      end: "18:00",
      start: "08:00",
    },
    {
      day: "Friday",
      end: "18:00",
      start: "08:00",
    },
    {
      day: "Saturday",
      end: "15:00",
      start: "08:00",
    },
  ],
  services: [
    {
      service: "",
      categorie: "",
      duration: "",
      waitingtime: "",
      price: "",
    },
  ],
  employee: [
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
      services: ["blabla"],
      workingTime: [{ day: "saturday", start: "8:00", end: "15:00" }],
    },
  ],
};

//to see if it's have to be separete or in admin collection
// openings are created from the working time of the employee :
//I don't really know if we should already cut them in slot or if we should start with 30 min slots

let openings = [
  {
    employee: "name",
    avaibility: { "2020-01-02": ["08:00"] },
  },
];

// when there in a appointment booked it's creating an event and delete the slot from the employee - add event to the user
const events = [
  {
    kind: "booking",
    start: "2020-01-03 12:00",
    end: "2020-01-03 12:30",
    employee: "",
    customer: "",
    style: "",
  },
];

// when booking delete slot from the avaibilities????

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
