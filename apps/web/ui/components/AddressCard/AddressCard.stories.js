import React from "react";
import AddressCard from "./AddressCard";
//component story format

export default {
  title: "Components/AddressCard", // should be unique in the whole project
  component: AddressCard,
};

const Template = (args) => <AddressCard {...args} />;
export const AddressCardA = Template.bind({});
