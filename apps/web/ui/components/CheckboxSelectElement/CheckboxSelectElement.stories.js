import React from "react";
import CheckboxSelectElement from "./CheckboxSelectElement";

export default {
  title: "Elements/CheckboxSelectElement",
  component: CheckboxSelectElement,
  args: {
    labels: ["hi", "bye"],
  },
};

const Template = (args) => <CheckboxSelectElement {...args} />;

export const HorizontalCheckbox = Template.bind({});
HorizontalCheckbox.args = {
  labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  type: "checkbox",
};

export const VerticalRadio = Template.bind({});
VerticalRadio.args = {
  labels: ["ja", "nein"],
  type: "radio",
};
