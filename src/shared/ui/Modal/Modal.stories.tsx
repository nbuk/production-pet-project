import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Modal } from "./Modal";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";

export default {
  title: "shared/Modal",
  component: Modal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deleniti deserunt distinctio doloremque ducimus in modi, nemo numquam pariatur totam!",
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deleniti deserunt distinctio doloremque ducimus in modi, nemo numquam pariatur totam!",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
