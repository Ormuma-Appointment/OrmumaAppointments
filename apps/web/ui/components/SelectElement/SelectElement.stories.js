import React from "react";
import SelectElement from "./SelectElement";

export default {
  title: "Elements/SelectElement",
  component: SelectElement,
  args: { minute: false },
};

const Template = (args) => <SelectElement {...args} />;
export const HourSelect = Template.bind({});

export const MinuteSelect = Template.bind({});
MinuteSelect.args = {
  minute: true,
};
