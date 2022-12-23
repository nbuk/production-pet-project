import { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { classNames, Mods } from "shared/lib/classNames";
import { Portal } from "shared/ui/Portal/Portal";
import styles from "./Modal.module.scss";
import { useTheme } from "app/providers/ThemeProvider";
import { Overlay } from "shared/ui/Overlay";

interface ModalProps {
  className?: string;
  isOpen?: boolean;
  lazy?: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  const { className, isOpen, lazy, onClose, children } = props;

  const { theme } = useTheme();
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isMounted) {
      setIsOpening(true);
    }
  }, [isMounted]);

  const handleClose = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsOpening(false);
        setIsClosing(false);
        setIsMounted(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

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
        <Overlay onClick={handleClose} />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
