import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./Button.module.scss";

export const enum ThemeButton {
  CLEAR = "clear",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
}

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { className, children, theme, ...rest } = props;
  return (
    <button
      className={classNames(styles.Button, {}, [className, styles[theme]])}
      {...rest}
    >
      {children}
    </button>
  );
};
