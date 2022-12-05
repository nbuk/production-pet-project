import { FC, PropsWithChildren } from "react";
import { classNames, Mods } from "shared/lib/classNames";
import styles from "./Flex.module.scss";

export type FlexJustify = "start" | "center" | "end" | "between";
export type FlexAlign = "start" | "center" | "end";
export type FlexDirection = "row" | "column";
export type FlexGap = 4 | 8 | 16 | 32;

export interface FlexProps {
  className?: string;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
  wrap?: boolean;
}

const justifyClasses: Record<FlexJustify, string> = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
  row: styles.directionRow,
  column: styles.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  4: styles.gap4,
  8: styles.gap8,
  16: styles.gap16,
  32: styles.gap32,
};

export const Flex: FC<PropsWithChildren<FlexProps>> = (props) => {
  const {
    className,
    children,
    justify = "start",
    align = "center",
    direction = "row",
    gap = 8,
    max,
    wrap,
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gapClasses[gap],
  ];

  const mods: Mods = {
    [styles.max]: max,
    [styles.wrap]: wrap,
  };

  return (
    <div className={classNames(styles.Flex, mods, classes)}>
      {children}
    </div>
  );
};
