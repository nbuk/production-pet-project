import { memo, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import styles from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/Button";
import { LoginModal } from "features/authByUsername";
import { useSelector } from "react-redux";
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "entities/User";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text } from "shared/ui/Text";
import { AppLink } from "shared/ui/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { TextTheme } from "shared/ui/Text/Text";
import { Dropdown } from "shared/ui/Dropdown";
import { Avatar } from "shared/ui/Avatar";

interface NavbarProps {
  className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const isAdminPanelAvailable = isAdmin || isManager;

  console.log(isAdmin);

  console.log(isAdminPanelAvailable);

  const handleModalClose = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const handleModalOpen = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <header className={classNames(styles.NavBar, {}, [className ?? ""])}>
        <Text className={styles.appName} title={"Awesome SPA app"} theme={TextTheme.INVERTED} />
        <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY} >
          {t("Написать статью")}
        </AppLink>
        <Dropdown
          className={styles.dropdown}
          direction={"bottom-left"}
          items={[
            ...(isAdminPanelAvailable
              ? [{
                  content: t("Админка"),
                  href: RoutePath.admin_panel,
                }]
              : []),
            {
              content: t("Профиль"),
              href: RoutePath.profile + authData.id,
            },
            {
              content: t("Выйти"),
              onClick: handleLogout,
            },
          ]}
          trigger={<Avatar src={authData.avatar} size={30} />}
        />
      </header>
    );
  }

  return (
    <header className={classNames(styles.NavBar, {}, [className ?? ""])}>
      <Button theme={ButtonTheme.CLEAR_INVERTED} className={styles.links} onClick={handleModalOpen}>
        {t("Войти")}
      </Button>
      <LoginModal isOpen={isAuthModalOpen} onClose={handleModalClose} />
    </header>
  );
});
