import React from "react";
import SelectElement from "./SelectElement";

export default {
  title: "Elements/SelectElement",
  component: SelectElement,
};

const Template = (args) => <SelectElement {...args} />;

export const HorizontalRadio = Template.bind({});
HorizontalRadio.args = {
  labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  multiselect: true,
};

// export const VerticalRadio = Template.bind({});
// VerticalRadioSecondary.args = {};
