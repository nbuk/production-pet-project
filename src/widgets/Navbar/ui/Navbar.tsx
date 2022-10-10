import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import styles from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <div className={classNames(styles.NavBar, {}, [className ?? ""])}>
      <div className={styles.links}>
      </div>
    </div>
  );
};
