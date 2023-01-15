import React from "react";
import Input from "./Input";

export default {
  title: "Elements/Input", // should be unique in the whole project
  component: Input,
  args: {
    placeholder: "Hi from placeholder",
  },
};

const Template = (args) => <Input {...args} />;

export const NoIconInput = Template.bind({});
NoIconInput.args = {
  placeholder: "I don't have an icon",
};

export const AccountInput = Template.bind({});
AccountInput.args = {
  placeholder: "What's your name?",
  user: true,
};
