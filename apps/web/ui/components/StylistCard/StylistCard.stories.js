import StylistCard from "./StylistCard";
import placeHolder from "../assets/placeholder-profile.png";

export default {
  title: "Components/StylistCard",
  component: StylistCard,
  args: {
    image: placeHolder,
    name: "Sammy Laury",
    text: "Spezialisiert in Balayage und vibrant colors",
  },
};

const Template = (args) => <StylistCard {...args} />;
export const StylistCards = Template.bind({});
