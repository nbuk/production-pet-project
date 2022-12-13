import {ComponentMeta, ComponentStory} from "@storybook/react";

import {ArticleDetailsComments} from "./ArticleDetailsComments";
import {StoreDecorator} from "shared/config/storybook/StoreDecorator";

export default {
  title: "pages/ArticleDetailsPage/ArticleDetailsComments",
  component: ArticleDetailsComments,
  argTypes: {},
  decorators: [StoreDecorator({})]
} as ComponentMeta<typeof ArticleDetailsComments>;

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => <ArticleDetailsComments {...args} />;

export const Normal = Template.bind({});
Normal.args = {};