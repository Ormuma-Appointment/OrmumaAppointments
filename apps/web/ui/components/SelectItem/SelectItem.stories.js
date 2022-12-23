import SelectItem from "./SelectItem";

export default {
  title: "Components/SelectItem", // should be unique in the whole project
  component: SelectItem,
  args: {
    name: "Waschen, Schneiden, Stylen",
    price: "59,00 €",
    duration: "45 mins",
  },
};

const Template = (args) => <SelectItem {...args} />;
export const Service = Template.bind({});
// Service.args = {
//   name: "Waschen, Schneiden, Stylen",
//   price: "59,00€",
//   duration: "45 mins",
// };
