import React from "react";
import ContactCard from "./ContactCard";
//component story format

export default {
  title: "Components/ContactCard", // should be unique in the whole project
  component: ContactCard,
  args: {},
};

const Template = (args) => <ContactCard {...args} />;
export const ContactCardComponent = Template.bind({});
