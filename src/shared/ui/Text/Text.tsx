import { memo } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./Text.module.scss";

export const enum TextTheme {
  PRIMARY = "primary",
  ERROR = "error",
}

export const enum TextAlign {
  RIGHT = "right",
  CENTER = "center",
  LEFT = "left",
}

export const enum TextSize {
  M = "size_m",
  L = "size_l",
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  align?: TextAlign;
  size?: TextSize;
  theme?: TextTheme;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    align = TextAlign.LEFT,
    size = TextSize.M,
    text,
    theme = TextTheme.PRIMARY,
  } = props;

  return (
    <div className={classNames(styles.Text, {}, [className, styles[theme], styles[align], styles[size]])}>
      {title && <p className={styles.title}>{title}</p>}
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
});
