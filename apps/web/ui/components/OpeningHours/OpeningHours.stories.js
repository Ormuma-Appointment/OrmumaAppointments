import OpeningHours from "./OpeningHours";

export default {
  title: "Components/OpeningHours",
  component: OpeningHours,
  args: {
    hours: [
      { day: 1, start: "08:00", end: "18:00" },
      { day: 2, start: "08:00", end: "18:00" },
      { day: 3, start: "08:00", end: "18:00" },
      { day: 4, start: "08:00", end: "18:00" },
      { day: 5, start: "08:00", end: "18:00" },
      { day: 6, start: "08:00", end: "15:00" },
    ],
  },
};

const Template = (args) => <OpeningHours {...args} />;
export const OpeningHoursCard = Template.bind({});
