import { Story } from "@storybook/react";
import { Theme, ThemeProvider } from "@/app/providers/ThemeProvider";

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => {
  return (
    <div className={`app ${theme}`}>
      <ThemeProvider initialTheme={theme}>
        <StoryComponent />
      </ThemeProvider>
    </div>
  );
};
