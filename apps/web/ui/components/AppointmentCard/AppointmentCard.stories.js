import React from "react";
import AppointmentCard from "./AppointmentCard";

export default {
  title: "Components/AppointmentCard",
  component: AppointmentCard,
};

const Template = (args) => <AppointmentCard {...args} />;
export const AppointmentCardBookAgain = Template.bind({});
