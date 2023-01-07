import { memo } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./Text.module.scss";

export const enum TextTheme {
  PRIMARY = "primary",
  INVERTED = "inverted",
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

type TitleTagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
type TextTagType = "p" | "span";

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  titleTag?: TitleTagType;
  textTag?: TextTagType;
  align?: TextAlign;
  size?: TextSize;
  theme?: TextTheme;

  "data-testid"?: string;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    align = TextAlign.LEFT,
    size = TextSize.M,
    text,
    theme = TextTheme.PRIMARY,
    titleTag = "h1",
    textTag = "p",
    "data-testid": dataTestId = "Text",
  } = props;

  const TitleTag = titleTag;
  const TextTag = textTag;

  return (
    <div className={classNames(styles.Text, {}, [className, styles[theme], styles[align], styles[size]])}>
      {title && <TitleTag className={styles.title} data-testid={`${dataTestId}.Header`}>{title}</TitleTag>}
      {text && <TextTag className={styles.text} data-testid={`${dataTestId}.Paragraph`}>{text}</TextTag>}
    </div>
  );
});
