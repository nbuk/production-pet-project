import {ComponentMeta, ComponentStory} from "@storybook/react";

import {ArticleDetailsPageHeader} from "./ArticleDetailsPageHeader";
import {StoreDecorator} from "shared/config/storybook/StoreDecorator";

export default {
  title: "pages/ArticleDetailsPage/ArticleDetailsPageHeader",
  component: ArticleDetailsPageHeader,
  argTypes: {},
  decorators: [StoreDecorator({})]
} as ComponentMeta<typeof ArticleDetailsPageHeader>;

const Template: ComponentStory<typeof ArticleDetailsPageHeader> = (args) => <ArticleDetailsPageHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
