import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Text } from "@/shared/ui/Text/Text";

import { Card } from "./Card";

export default {
  title: "shared/Card",
  component: Card,
  argTypes: {},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args}><Text title={"Card title"} text={"Description text"} /></Card>;

export const Normal = Template.bind({});
Normal.args = {};
