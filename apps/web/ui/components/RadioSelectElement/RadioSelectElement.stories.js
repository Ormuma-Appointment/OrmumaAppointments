import React from "react";
import RadioSelectElement from "./RadioSelectElement";

export default {
  title: "Elements/RadioSelectElement",
  component: RadioSelectElement,
  args: {
    labels: ["hi", "bye"],
  },
};

const Template = (args) => <RadioSelectElement {...args} />;

export const VerticalRadio = Template.bind({});
VerticalRadio.args = {
  labels: ["ja", "nein"],
  type: "radio",
};
