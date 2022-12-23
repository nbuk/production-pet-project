import { memo, ReactNode } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import styles from "./Drawer.module.scss";
import { Portal } from "../Portal/Portal";
import { Overlay } from "shared/ui/Overlay/Overlay";
import { useModal } from "shared/lib/hooks/useModal";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  lazy?: boolean;
  onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className,
    children,
    onClose,
    isOpen,
    lazy,
  } = props;
  const { theme } = useTheme();
  const { isMounted, isOpening, isClosing, close } = useModal({
    isOpen,
    onClose,
    animationDelay: 300,
  });

  const mods: Mods = {
    [styles.opened]: isOpening,
    [styles.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(styles.Drawer, mods, [className, theme, "app_drawer"])}>
        <Overlay onClick={close} />
        <div
          className={styles.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
