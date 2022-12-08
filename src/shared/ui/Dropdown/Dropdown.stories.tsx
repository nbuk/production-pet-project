import {ComponentMeta, ComponentStory} from "@storybook/react";

import {Dropdown} from "./Dropdown";
import {Button} from "shared/ui/Button";

export default {
  title: "shared/Dropdown",
  component: Dropdown,
  argTypes: {},
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  trigger: <Button>Open</Button>,
  items: [{ content: 'Login', onClick: () => {} }, { content: 'Logout', onClick: () => {} },]
};