import React from "react";
import BreadCrumb from "./BreadCrumb";

export default {
  title: "Components/BreadCrumb",
  component: BreadCrumb,
  args: {
    steps: ["Store Setup", "Services Konfgurieren", "Team konfigurieren"],
    current: 1,
  },
};

const Template = (args) => <BreadCrumb {...args} />;
export const BreadCrumbs = Template.bind({});
