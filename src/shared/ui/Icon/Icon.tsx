import React, { memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./Icon.module.scss";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo((props: PropsWithChildren<IconProps>) => {
  const { className, Svg, ...rest } = props;

  return (
    <Svg className={classNames(styles.Icon, {}, [className])} {...rest} />
  );
});
