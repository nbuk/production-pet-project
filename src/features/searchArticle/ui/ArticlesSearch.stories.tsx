import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArticlesSearch } from "./ArticlesSearch";

export default {
  title: "features/ArticlesSearch",
  component: ArticlesSearch,
  argTypes: {},
} as ComponentMeta<typeof ArticlesSearch>;

const Template: ComponentStory<typeof ArticlesSearch> = (args) => <ArticlesSearch {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
