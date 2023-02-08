import React from "react";
import RadioSelectElement from "./RadioSelectElement";

export default {
  title: "Elements/RadioSelectElement",
  component: RadioSelectElement,
};

const Template = (args) => <RadioSelectElement {...args} />;

export const VerticalRadio = Template.bind({});
VerticalRadio.args = {
  labels: ["ja", "nein"],
};
