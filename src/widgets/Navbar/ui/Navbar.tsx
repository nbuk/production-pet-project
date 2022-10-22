import { memo, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import styles from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/Button";
import { LoginModal } from "features/AuthByUsername";
import { useSelector } from "react-redux";
import { getUserAuthData, userActions } from "entities/User";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface NavbarProps {
  className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);

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
      <div className={classNames(styles.NavBar, {}, [className ?? ""])}>
        <Button theme={ButtonTheme.CLEAR_INVERTED} className={styles.links} onClick={handleLogout}>
          {t("Выйти")}
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(styles.NavBar, {}, [className ?? ""])}>
      <Button theme={ButtonTheme.CLEAR_INVERTED} className={styles.links} onClick={handleModalOpen}>
        {t("Войти")}
      </Button>
      <LoginModal isOpen={isAuthModalOpen} onClose={handleModalClose} />
    </div>
  );
});
