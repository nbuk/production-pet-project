import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommentList } from "./CommentList";

export default {
  title: "entities/Comment/CommentList",
  component: CommentList,
  argTypes: {},
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comments: [
    {
      id: "1",
      text: "hello world",
      user: { id: "1", username: "admin" },
    },
    {
      id: "1",
      text: "comment 2",
      user: { id: "1", username: "Nikolay" },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
