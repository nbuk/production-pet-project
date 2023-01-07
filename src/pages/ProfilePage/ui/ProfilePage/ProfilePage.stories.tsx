import { ComponentMeta, ComponentStory } from "@storybook/react";

import ProfilePage from "./ProfilePage";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator";
import { Country } from "@/entities/Country";
import avatar from "@/shared/assets/tests/avatar.png";

export default {
  title: "pages/ProfilePage",
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => (
  <ProfilePage />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({
  profile: {
    form: {
      firstname: "Nikolay",
      lastname: "Bukharin",
      age: 26,
      country: Country.Russia,
      city: "Moscow",
      username: "nbuk",
      avatar,
    },
  },
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      firstname: "Nikolay",
      lastname: "Bukharin",
      age: 26,
      country: Country.Russia,
      city: "Moscow",
      username: "nbuk",
      avatar,
    },
  },
})];

export const Editable = Template.bind({});
Editable.args = {};
Editable.decorators = [ThemeDecorator(Theme.BLUE), StoreDecorator({
  user: {
    authData: {
      id: "1",
    },
  },
  profile: {
    form: {
      id: "1",
      firstname: "Nikolay",
      lastname: "Bukharin",
      age: 26,
      country: Country.Russia,
      city: "Moscow",
      username: "nbuk",
      avatar,
    },
  },
})];
