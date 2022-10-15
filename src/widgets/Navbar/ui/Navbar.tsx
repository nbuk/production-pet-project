import { FC, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import styles from "./Navbar.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/Button";
import { LoginModal } from "features/AuthByUsername";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleModalClose = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const handleModalOpen = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  return (
    <div className={classNames(styles.NavBar, {}, [className ?? ""])}>
      <Button theme={ButtonTheme.CLEAR_INVERTED} className={styles.links} onClick={handleModalOpen}>
        {t("Войти")}
      </Button>
      <LoginModal isOpen={isAuthModalOpen} onClose={handleModalClose} />
    </div>
  );
};
