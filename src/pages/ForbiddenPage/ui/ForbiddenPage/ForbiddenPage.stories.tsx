import {ComponentMeta, ComponentStory} from "@storybook/react";

import ForbiddenPage from "./ForbiddenPage";

export default {
  title: "pages/ForbiddenPage",
  component: ForbiddenPage,
  argTypes: {},
} as ComponentMeta<typeof ForbiddenPage>;

const Template: ComponentStory<typeof ForbiddenPage> = (args) => <ForbiddenPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};