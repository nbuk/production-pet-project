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

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  align?: TextAlign;
  theme?: TextTheme;
}

export const Text = memo((props: TextProps) => {
  const { className, title, align = TextAlign.LEFT, text, theme = TextTheme.PRIMARY } = props;

  console.log([className, styles[theme], styles[align]]);

  return (
    <div className={classNames(styles.Text, {}, [className, styles[theme], styles[align]])}>
      {title && <p className={styles.title}>{title}</p>}
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
});
