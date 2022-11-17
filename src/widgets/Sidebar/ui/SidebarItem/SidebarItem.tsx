import { memo } from "react";
import styles from "./SidebarItem.module.scss";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { SidebarItemType } from "widgets/Sidebar/model/types/sidebarItems";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const { item, collapsed } = props;
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) return null;

  const mods: Record<string, boolean> = {
    [styles.collapsed]: collapsed,
  };

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(styles.item, mods)}
    >
      <item.Icon className={styles.icon} />
      <span className={styles.link}>{t(item.text)}</span>
    </AppLink>
  );
});
