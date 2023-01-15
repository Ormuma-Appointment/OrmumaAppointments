import OpeningHours from "./OpeningHours";

export default {
  title: "Components/OpeningHours",
  component: OpeningHours,
  args: {},
};

const Template = (args) => <OpeningHours {...args} />;
export const OpeningHoursCard = Template.bind({});
