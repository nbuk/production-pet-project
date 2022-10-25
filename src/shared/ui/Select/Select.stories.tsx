import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Select } from "shared/ui/Select/Select";

export default {
  title: "shared/Select",
  component: Select,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <Select {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: "Выберете значение",
  options: [{ label: "Первый", value: "Первый" }, { label: "Второй", value: "Второй" }, { label: "Третий", value: "Третий" }],
  value: "Первый",
};
