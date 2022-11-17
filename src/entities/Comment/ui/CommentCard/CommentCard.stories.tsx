import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommentCard } from "./CommentCard";

export default {
  title: "entities/Comment/CommentCard",
  component: CommentCard,
  argTypes: {},
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comment: {
    id: "1",
    text: "Comment text",
    user: {
      id: "1",
      username: "Admin",
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
