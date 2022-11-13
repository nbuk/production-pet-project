import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Code } from "./Code";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

export default {
  title: "shared/Code",
  component: Code,
  argTypes: {},
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  codeText: "import { ComponentMeta, ComponentStory } from \"@storybook/react\";\n" +
    "\n" +
    "import { Code } from \"./Code\";\n" +
    "\n" +
    "export default {\n" +
    "  title: \"shared/Code\",\n" +
    "  component: Code,\n" +
    "  argTypes: {},\n" +
    "} as ComponentMeta<typeof Code>;\n" +
    "\n" +
    "const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;",
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  codeText: "import { ComponentMeta, ComponentStory } from \"@storybook/react\";\n" +
    "\n" +
    "import { Code } from \"./Code\";\n" +
    "\n" +
    "export default {\n" +
    "  title: \"shared/Code\",\n" +
    "  component: Code,\n" +
    "  argTypes: {},\n" +
    "} as ComponentMeta<typeof Code>;\n" +
    "\n" +
    "const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;",
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const BlueTheme = Template.bind({});
BlueTheme.args = {
  codeText: "import { ComponentMeta, ComponentStory } from \"@storybook/react\";\n" +
    "\n" +
    "import { Code } from \"./Code\";\n" +
    "\n" +
    "export default {\n" +
    "  title: \"shared/Code\",\n" +
    "  component: Code,\n" +
    "  argTypes: {},\n" +
    "} as ComponentMeta<typeof Code>;\n" +
    "\n" +
    "const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;",
};
BlueTheme.decorators = [ThemeDecorator(Theme.BLUE)];
