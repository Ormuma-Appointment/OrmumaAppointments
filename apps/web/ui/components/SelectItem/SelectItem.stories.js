import SelectItem from "./SelectItem";

export default {
  title: "Components/SelectItem", // should be unique in the whole project
  component: SelectItem,
  args: {
    title: "Waschen, Schneiden, Stylen",
  },
};

const Template = (args) => <SelectItem {...args} />;
export const ServicePriceDurationPlus = Template.bind({});
ServicePriceDurationPlus.args = {
  price: "59,00€",
  duration: "45 mins",
  plus: true,
};

export const ServicePlusIcon = Template.bind({});
ServicePlusIcon.args = {
  plus: true,
};
