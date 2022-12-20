import React from "react";
import Button from "./Button";
//component story format

export default {
  title: "Elements/Button", // should be unique in the whole project
  component: Button,
  args: {
    children: "button",
    size: "medium_button",
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
