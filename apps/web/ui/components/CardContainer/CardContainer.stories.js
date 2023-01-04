import React from "react";
import CardContainer from "./CardContainer";
//component story format

export default {
  title: "Elements/CardContainer", // should be unique in the whole project
  component: CardContainer,
  args: {
    children: "Hello",
  },
};

const Template = (args) => <CardContainer {...args} />;
export const CardContainerA = Template.bind({});
