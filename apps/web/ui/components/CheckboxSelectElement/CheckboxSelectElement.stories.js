import React from "react";
import CheckboxSelectElement from "./CheckboxSelectElement";

export default {
  title: "Elements/CheckboxSelectElement",
  component: CheckboxSelectElement,
};

const Template = (args) => <CheckboxSelectElement {...args} />;

export const HorizontalCheckbox = Template.bind({});
HorizontalCheckbox.args = {
  labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
};
