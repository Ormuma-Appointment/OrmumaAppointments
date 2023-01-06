import React from "react";
import AddressCard from "./AddressCard";

export default {
  title: "Components/AddressCard",
  component: AddressCard,
};

const Template = (args) => <AddressCard {...args} />;
export const AddressCardA = Template.bind({});
