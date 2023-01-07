import { FC, PropsWithChildren, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}

export const Avatar: FC<PropsWithChildren<AvatarProps>> = (props) => {
  const { className, src, size = 30, alt } = props;

  const inlineStyles = useMemo(() => ({
    width: size,
    height: size,
  }), [size]);

  return (
    <div style={inlineStyles} className={classNames(styles.Avatar, {}, [className])}>
        <img src={src} alt={alt ?? ""} />
    </div>
  );
};
