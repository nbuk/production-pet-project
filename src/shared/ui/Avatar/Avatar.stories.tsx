import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Avatar } from "./Avatar";
import avatar from "@/shared/assets/tests/avatar.png";

export default {
  title: "shared/Avatar",
  component: Avatar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
);

export const Large = Template.bind({});
Large.args = {
  size: 150,
  src: avatar,
};

export const Small = Template.bind({});
Small.args = {
  size: 50,
  src: avatar,
};
