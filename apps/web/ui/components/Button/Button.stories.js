import React from "react";
import Button from "./Button";

export default {
  title: "Elements/Button",
  component: Button,
  args: {
    children: "button",
    size: "medium",
    icon: "",
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "primary button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
};
export const Invisible = Template.bind({});
Invisible.args = {
  variant: "invisible",
};
export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: "primary",
  children: "Termin buchen",
  icon: true,
};
