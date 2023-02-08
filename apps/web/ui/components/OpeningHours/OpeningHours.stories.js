import OpeningHours from "./OpeningHours";

export default {
  title: "Components/OpeningHours",
  component: OpeningHours,
  args: {
    hours: [
      { day: "Monday", start: "08:00", end: "18:00" },
      { day: "Tuesday", start: "08:00", end: "18:00" },
      { day: "Wednesday", start: "08:00", end: "18:00" },
      { day: "Thursday", start: "08:00", end: "18:00" },
      { day: "Friday", start: "08:00", end: "18:00" },
      { day: "Saturday", start: "08:00", end: "15:00" },
    ],
  },
};

const Template = (args) => <OpeningHours {...args} />;
export const OpeningHoursCard = Template.bind({});
