import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./Card.module.scss";

export const enum CardTheme {
  NORMAL = "normal",
  OUTLINED = "outlined",
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
}

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { className, children, theme = CardTheme.NORMAL, ...otherProps } = props;

  return (
    <div className={classNames(styles.Card, {}, [className, styles[theme]])} {...otherProps}>
      {children}
    </div>
  );
};
