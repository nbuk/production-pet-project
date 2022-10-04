import { FC, PropsWithChildren, useState } from "react";

import { classNames } from "shared/lib/classNames";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";

import styles from "./Sidebar.module.scss";
import { LangSwitcher } from "widgets/LangSwitcher";

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<PropsWithChildren<SidebarProps>> = (props) => {
  const { className } = props;
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = (): void => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={classNames(styles.Sidebar, { [styles.collapsed]: collapsed }, [className ?? ""])}
    >
      <button onClick={onToggle}>toggle</button>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={styles.lang} />
      </div>
    </div>
  );
};
