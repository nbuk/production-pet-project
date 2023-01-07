import { CSSProperties, memo, PropsWithChildren } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string;
}

export const Skeleton = memo((props: PropsWithChildren<SkeletonProps>) => {
  const {
    className,
    height,
    width,
    borderRadius,
  } = props;

  const cssStyles: CSSProperties = {
    width,
    height,
    borderRadius,
  };

  return (
    <div
      style={cssStyles}
      className={classNames(styles.Skeleton, {}, [className])}
    >

    </div>
  );
});
