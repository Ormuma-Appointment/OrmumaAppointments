import SelectItem from "./SelectItem";
import plusIcon from "../assets/plus.svg";
import editIcon from "../assets/edit.svg";

export default {
  title: "Components/SelectItem", // should be unique in the whole project
  component: SelectItem,
  args: {
    title: "Waschen, Schneiden, Stylen",
  },
};

const Template = (args) => <SelectItem {...args} />;
export const ServiceOnly = Template.bind({});

export const ServicePlusIcon = Template.bind({});
ServicePlusIcon.args = {
  icon: plusIcon,
};

export const ServicePriceDurationPlus = Template.bind({});
ServicePriceDurationPlus.args = {
  price: "59,00€",
  duration: "45 mins",
  icon: plusIcon,
};

export const ServiceEditIcon = Template.bind({});
ServiceEditIcon.args = {
  icon: editIcon,
};
