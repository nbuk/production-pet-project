import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Flex } from "./Flex";

export default {
  title: "shared/Flex",
  component: Flex,
  argTypes: {},
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const RowGap4 = Template.bind({});
RowGap4.args = {
  direction: "row",
  gap: 4,
  children: (
    <>
      <div>First block</div>
      <div>Seconds block</div>
      <div>Third block</div>
    </>
  ),
};

export const RowGap8 = Template.bind({});
RowGap8.args = {
  direction: "row",
  gap: 8,
  children: (
    <>
      <div>First block</div>
      <div>Seconds block</div>
      <div>Third block</div>
    </>
  ),
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
  direction: "row",
  gap: 16,
  children: (
    <>
      <div>First block</div>
      <div>Seconds block</div>
      <div>Third block</div>
    </>
  ),
};

export const RowGap32 = Template.bind({});
RowGap32.args = {
  direction: "row",
  gap: 32,
  children: (
    <>
      <div>First block</div>
      <div>Seconds block</div>
      <div>Third block</div>
    </>
  ),
};

export const ColumnGap4 = Template.bind({});
ColumnGap4.args = {
  direction: "column",
  gap: 4,
  children: (
    <>
      <div>First block</div>
      <div>Seconds block</div>
      <div>Third block</div>
    </>
  ),
};

export const ColumnGap8 = Template.bind({});
ColumnGap8.args = {
  direction: "column",
  gap: 8,
  children: (
    <>
      <div>First block</div>
      <div>Seconds block</div>
      <div>Third block</div>
    </>
  ),
};

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
  direction: "column",
  gap: 16,
  children: (
    <>
      <div>First block</div>
      <div>Seconds block</div>
      <div>Third block</div>
    </>
  ),
};

export const ColumnGap32 = Template.bind({});
ColumnGap32.args = {
  direction: "column",
  gap: 32,
  children: (
    <>
      <div>First block</div>
      <div>Seconds block</div>
      <div>Third block</div>
    </>
  ),
};
