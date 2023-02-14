import Navigation from "./Navigation";
import { withReactContext } from "storybook-react-context";

export default {
  title: "Components/Navigation",
  component: Navigation,
  args: {},
  decorators: [
    withReactContext({
      Context: useAuthContext,
      initialState: { currentUser: false },
    }),
    withReactContext({
      Context: useAuthContext,
      initialState: { isAdmin: false },
    }),
    withReactContext({
      Context: useAuthContext,
      initialState: { adminStoreId: 123 },
    }),
  ],
};

const Template = (args) => <Navigation {...args} />;
export const Navigations = Template.bind({});
