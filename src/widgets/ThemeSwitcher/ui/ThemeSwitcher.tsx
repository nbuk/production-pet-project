import { memo } from "react";

import { classNames } from "shared/lib/classNames/classNames";
import { Theme, useTheme } from "app/providers/ThemeProvider";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import DarkIcon from "shared/assets/icons/theme-dark.svg";
import LightIcon from "shared/assets/icons/theme-light.svg";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
  const { className } = props;
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classNames("", {}, [className])}
      onClick={toggleTheme}
    >
      {/* {theme === Theme.DARK */}
      {/*  ? <DarkIcon height={20} width={20} fill={"#535353"} /> */}
      {/*  : <LightIcon height={20} width={20} fill={"#ffffff"} /> */}
      {/* } */}
      {theme === Theme.DARK && <DarkIcon height={20} width={20} fill={"#535353"} />}
      {theme === Theme.LIGHT && <LightIcon height={20} width={20} fill={"#ffffff"} />}
      {theme === Theme.BLUE && <DarkIcon height={20} width={20} fill={"#535353"} />}
    </Button>
  );
});
