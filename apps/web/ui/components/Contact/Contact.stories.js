import React from "react";
import Contact from "./Contact";
//component story format

export default {
  title: "Components/Contact", // should be unique in the whole project
  component: Contact,
  args: {},
};

const Template = (args) => <Contact {...args} />;
export const ContactComponent = Template.bind({});
