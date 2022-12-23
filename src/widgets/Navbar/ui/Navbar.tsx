import { memo, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import styles from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button";
import { LoginModal } from "features/authByUsername";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { Text } from "shared/ui/Text";
import { AppLink } from "shared/ui/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { TextTheme } from "shared/ui/Text/Text";
import { HStack } from "shared/ui/Stack";
import { NotificationButton } from "features/notificationButton";
import { AvatarDropdown } from "features/avatarDropdown";

interface NavbarProps {
  className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const authData = useSelector(getUserAuthData);

  const handleModalClose = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const handleModalOpen = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  if (authData) {
    return (
      <header className={classNames(styles.NavBar, {}, [className ?? ""])}>
        <Text className={styles.appName} title={"Awesome SPA app"} theme={TextTheme.INVERTED} />
        <AppLink className={styles.createArticle} to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY} >
          {t("Написать статью")}
        </AppLink>
        <HStack justify={"end"} className={styles.actions} gap={16} max>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
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
