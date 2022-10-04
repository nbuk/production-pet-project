import { FC } from "react";
import { classNames } from "shared/lib/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";

import styles from "./Navbar.module.scss";

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <div className={classNames(styles.NavBar, {}, [className])}>
      <div className={styles.links}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={"/"}
          className={styles.mainLink}
        >
          Главная
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to={"/about"}>
          About
        </AppLink>
      </div>
    </div>
  );
};
