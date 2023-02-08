import React from "react";
import CardContainer from "./CardContainer";

export default {
  title: "Elements/CardContainer",
  component: CardContainer,
  args: {
    children: "Hello",
  },
};

const Template = (args) => <CardContainer {...args} />;
export const CardContainerA = Template.bind({});
