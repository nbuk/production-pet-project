import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Skeleton } from "./Skeleton";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";

export default {
  title: "shared/Skeleton",
  component: Skeleton,
  argTypes: {},
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  width: "100%",
  height: 200,
};

export const Circle = Template.bind({});
Circle.args = {
  height: 100,
  width: 100,
  borderRadius: "50%",
};

export const NormalDark = Template.bind({});
NormalDark.args = {
  width: "100%",
  height: 200,
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const CircleDark = Template.bind({});
CircleDark.args = {
  height: 100,
  width: 100,
  borderRadius: "50%",
};
CircleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const NormalBlue = Template.bind({});
NormalBlue.args = {
  width: "100%",
  height: 200,
};
NormalBlue.decorators = [ThemeDecorator(Theme.BLUE)];

export const CircleBlue = Template.bind({});
CircleBlue.args = {
  height: 100,
  width: 100,
  borderRadius: "50%",
};
CircleBlue.decorators = [ThemeDecorator(Theme.BLUE)];
