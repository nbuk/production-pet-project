import {ComponentMeta, ComponentStory} from "@storybook/react";

import {ProfileCard} from "./ProfileCard";
import {Country} from "@/entities/Country";
import avatar from "@/shared/assets/tests/avatar.png";

export default {
  title: "entities/ProfileCard",
  component: ProfileCard,
  argTypes: {},
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    id: "1",
    firstname: "Nikolay",
    lastname: "Bukharin",
    age: 26,
    country: Country.Russia,
    city: "Moscow",
    username: "nbuk",
    avatar,
  },
};

export const Error = Template.bind({});
Error.args = {
  error: "true",
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
