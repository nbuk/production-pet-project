import { FC, PropsWithChildren } from "react";
import { classNames, Mods } from "@/shared/lib/classNames";
import { Portal } from "@/shared/ui/Portal/Portal";
import styles from "./Modal.module.scss";
import { useTheme } from "@/app/providers/ThemeProvider";
import { Overlay } from "@/shared/ui/Overlay";
import { useModal } from "@/shared/lib/hooks/useModal";

interface ModalProps {
  className?: string;
  isOpen: boolean;
  lazy?: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  const { className, isOpen, lazy, onClose, children } = props;
  const { isMounted, isOpening, isClosing, close } = useModal({
    isOpen,
    onClose,
    animationDelay: ANIMATION_DELAY,
  });
  const { theme } = useTheme();

  const mods: Mods = {
    [styles.opened]: isOpening,
    [styles.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(styles.Modal, mods, [className, theme])}>
        <Overlay onClick={close} />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
