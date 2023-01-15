import React from "react";
import Input from "./Input";

export default {
  title: "Elements/Input", // should be unique in the whole project
  component: Input,
  args: {
    icon: false,
    placeholder: "Hello some text",
  },
};

const Template = (args) => <Input {...args} />;

export const SmallInput = Template.bind({});
