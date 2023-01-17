import StylistCard from "./StylistCard";

export default {
  title: "Components/StylistCard",
  component: StylistCard,
  args: {},
};

const Template = (args) => <StylistCard {...args} />;
export const StylistCards = Template.bind({});
