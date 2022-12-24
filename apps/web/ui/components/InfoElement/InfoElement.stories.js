import InfoElement from "./InfoElement";

export default {
  title: "Components/InfoElement", // should be unique in the whole project
  component: InfoElement,
  args: {},
};

const Template = (args) => <InfoElement {...args} />;
export const EmailContact = Template.bind({});
EmailContact.args = {
  email: true,
  infoHl: "Email",
  infoDetail: "naturfriseur@gmail.com",
};

export const WebsiteContact = Template.bind({});
WebsiteContact.args = {
  internet: true,
  infoHl: "Website",
  infoDetail: "www.naturfriseur-aachen.de",
};
export const PhoneContact = Template.bind({});
PhoneContact.args = {
  phone: true,
  infoHl: "Telefon",
  infoDetail: "+49 1577 37384273",
};
