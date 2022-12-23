import Navigation from "./Navigation";

export default {
  title: "Components/Navigation",
  component: Navigation,
  args: {},
};

const Template = (args) => <Navigation {...args} />;
export const NavigationLoggedOff = Template.bind({});
