import SelectItem from "./SelectItem";

export default {
  title: "Components/SelectItem",
  component: SelectItem,
  args: {
    title: "Waschen, Schneiden, Stylen",
    selected: false,
  },
};

const Template = (args) => <SelectItem {...args} />;
export const ServiceOnly = Template.bind({});

export const ServicePlusIcon = Template.bind({});
ServicePlusIcon.args = {
  plus: true,
};

export const ServicePriceDurationPlus = Template.bind({});
ServicePriceDurationPlus.args = {
  price: "59,00€",
  duration: "45 mins",
  plus: true,
};

export const ServiceEditIcon = Template.bind({});
ServiceEditIcon.args = {
  edit: true,
};
