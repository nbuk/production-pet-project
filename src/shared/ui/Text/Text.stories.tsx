import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Text, TextTheme } from "./Text";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

export default {
  title: "shared/Text",
  component: Text,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Title text",
  text: "text under title",
};

export const Error = Template.bind({});
Error.args = {
  title: "Title text",
  text: "text under title",
  theme: TextTheme.ERROR,
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: "Title text",
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: "some text",
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: "Title text",
  text: "text under title",
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: "Title text",
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: "some text",
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];
