import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArticleDetailsPageHeader } from "./ArticleDetailsPageHeader";

export default {
  title: "shared/ArticleDetailsPageHeader",
  component: ArticleDetailsPageHeader,
  argTypes: {},
} as ComponentMeta<typeof ArticleDetailsPageHeader>;

const Template: ComponentStory<typeof ArticleDetailsPageHeader> = (args) => <ArticleDetailsPageHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
