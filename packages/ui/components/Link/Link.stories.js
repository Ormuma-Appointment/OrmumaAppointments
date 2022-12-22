import React from "react";
import Link from "./Link";

export default {
  title: "Elements/Link",
  component: Link,
  args: {
    size: "medium",
    children: "this is a text",
  },
};

const Template = (args) => <Link {...args} />;

export const PrimaryLink = Template.bind({});
PrimaryLink.args = {
  size: "medium",
};
