import { FC, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./AppLink.module.scss";
import { Link, LinkProps } from "react-router-dom";

export const enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<PropsWithChildren<AppLinkProps>> = (props) => {
  const {
    to,
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...rest
  } = props;
  return (
    <Link
      className={classNames(styles.AppLink, {}, [className, styles[theme]])}
      to={to}
      {...rest}
    >
      {children}
    </Link>
  );
};
