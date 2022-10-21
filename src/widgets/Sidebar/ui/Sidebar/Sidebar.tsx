import { memo, useState } from "react";

import { classNames } from "shared/lib/classNames/classNames";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";

import styles from "./Sidebar.module.scss";
import { LangSwitcher } from "widgets/LangSwitcher";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/Button";
import { sidebarItemsList } from "../../model/items";
import { SidebarItem } from "../SidebarItem/SidebarItem";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
  const { className } = props;
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = (): void => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-testid={"sidebar"}
      className={classNames(styles.Sidebar, { [styles.collapsed]: collapsed }, [className ?? ""])}
    >
      <Button
        data-testid={"sidebar-toggle"}
        onClick={onToggle}
        className={styles.collapseBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        square
      >
        { collapsed ? ">" : "<" }
      </Button>
      <div className={styles.items}>
        {sidebarItemsList.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            collapsed={collapsed}
          />
        ))}
      </div>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={styles.lang} short={collapsed} />
      </div>
    </div>
  );
});
