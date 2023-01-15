import React from "react";
import AddressCard from "./AddressCard";

export default {
  title: "Components/AddressCard",
  component: AddressCard,
  args: {
    name: "Naturfriseur Aachen",
    street: "Habsburgerallee",
    number: 11,
    postalCode: "52064",
    city: "Aachen",
    country: "Deutschland",
    telephone: "0241 / 70 98 99",
  },
};

const Template = (args) => <AddressCard {...args} />;
export const AddressCardA = Template.bind({});
