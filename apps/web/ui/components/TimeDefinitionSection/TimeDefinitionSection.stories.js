import React from "react";
import TimeDefinitionSection from "./TimeDefinitionSection";

export default {
  title: "Components/TimeDefinitionSection",
  component: TimeDefinitionSection,
  args: {
    openDays: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"],
  },
};

const Template = (args) => <TimeDefinitionSection {...args} />;

export const TimeDefinition = Template.bind({});
