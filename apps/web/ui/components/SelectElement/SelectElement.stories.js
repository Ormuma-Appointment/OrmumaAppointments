import React from "react";
import SelectElement from "./SelectElement";

export default {
  title: "Elements/SelectElement",
  component: SelectElement,
  args: {
    labels: ["hi", "bye"],
  },
};

const Template = (args) => <SelectElement {...args} />;

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
