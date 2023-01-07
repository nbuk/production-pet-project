import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArticlesPageFilters } from "./ArticlesPageFilters";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator";

export default {
  title: "pages/Article/ArticlesPageFilters",
  component: ArticlesPageFilters,
  argTypes: {},
} as ComponentMeta<typeof ArticlesPageFilters>;

const Template: ComponentStory<typeof ArticlesPageFilters> = (args) => <ArticlesPageFilters {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
  articlesPage: {
    entities: {},
    ids: [],
    isLoading: true,
  },
})];
