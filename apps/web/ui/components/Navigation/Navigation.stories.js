import Navigation from "./Navigation";

export default {
  title: "Components/Navigation",
  component: Navigation,
  args: {},
};

const Template = (args) => <Navigation {...args} />;
export const AdminLoggedOut = Template.bind({});
AdminLoggedOut.args = {
  admin_logged_out: true,
};

export const AdminLoggedIn = Template.bind({});
AdminLoggedIn.args = {
  admin_logged_in: true,
};

export const CustomerLoggedOut = Template.bind({});
CustomerLoggedOut.args = {
  customer_logged_out: true,
};

export const CustomerLoggedIn = Template.bind({});
CustomerLoggedIn.args = {
  customer_logged_in: true,
};
