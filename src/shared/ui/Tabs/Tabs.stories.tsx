import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Tabs } from "./Tabs";
import { action } from "@storybook/addon-actions";

export default {
  title: "shared/Tabs",
  component: Tabs,
  argTypes: {},
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  tabs: [
    {
      value: "tab1",
      content: "First",
    },
    {
      value: "tab2",
      content: "Second",
    },
    {
      value: "tab3",
      content: "Third",
    },
  ],
  value: "tab2",
  onTabClick: action("onTabClick"),
};
