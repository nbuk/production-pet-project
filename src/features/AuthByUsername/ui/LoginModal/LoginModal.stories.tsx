import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LoginModal } from "./LoginModal";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

export default {
  title: "features/LoginModal",
  component: LoginModal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => <LoginModal {...args} />;

export const LightTheme = Template.bind({});
LightTheme.args = {
  isOpen: true,
  lazy: false,
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  isOpen: true,
  lazy: false,
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
