import React from "react";
import AppointmentCard from "./AppointmentCard";

export default {
  title: "Components/AppointmentCard",
  component: AppointmentCard,
  args: {
    date: "03.01.2023",
    time: "11:30-12:00",
    stylist: "Jochen Lambatz",
    customer: "Andrea Berg",
    service: "Haar kurz, schneiden, waschen",
    cancel: true,
  },
};

const Template = (args) => <AppointmentCard {...args} />;
export const BookAgainAppointment = Template.bind({});
BookAgainAppointment.args = {
  cancel: false,
};

export const CancelAppointment = Template.bind({});
