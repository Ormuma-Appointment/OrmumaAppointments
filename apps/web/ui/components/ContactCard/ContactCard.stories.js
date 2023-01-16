import React from "react";
import ContactCard from "./ContactCard";
//component story format

export default {
  title: "Components/ContactCard", // should be unique in the whole project
  component: ContactCard,
  args: {
    email: "naturfriseur@gmail.com",
    website: "www.naturfriseur-aachen.de",
    telephone: "+49 1577 37384273",
  },
};

const Template = (args) => <ContactCard {...args} />;
export const ContactCardComponent = Template.bind({});
