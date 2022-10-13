import { FC, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import styles from "./Navbar.module.scss";
import { Modal } from "shared/ui/Modal/Modal";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/Button";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    setIsAuthModalOpen((prev) => !prev);
  }, []);

  return (
    <div className={classNames(styles.NavBar, {}, [className ?? ""])}>
      <Button theme={ButtonTheme.CLEAR_INVERTED} className={styles.links} onClick={handleToggleModal}>
        {t("Войти")}
      </Button>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <Modal isOpen={isAuthModalOpen} onClose={handleToggleModal}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deleniti deserunt distinctio doloremque ducimus in modi, nemo numquam pariatur totam!
      </Modal>
    </div>
  );
};
