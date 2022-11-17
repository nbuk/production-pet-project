import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LoginModal } from "./LoginModal";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator";

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
LightTheme.decorators = [StoreDecorator({
  loginForm: { username: "admin", password: "123" },
})];

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  isOpen: true,
  lazy: false,
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  loginForm: { username: "admin", password: "123" },
})];

export const WithError = Template.bind({});
WithError.args = {
  isOpen: true,
  lazy: false,
};
WithError.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  loginForm: { username: "admin", password: "123", error: "Invalid username/password" },
})];

export const Loading = Template.bind({});
Loading.args = {
  isOpen: true,
  lazy: false,
};
Loading.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  loginForm: { username: "admin", password: "123", isLoading: true },
})];
