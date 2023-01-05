import { useCallback, useEffect, useRef, useState } from "react";

interface UseModalProps {
  onClose?: () => void;
  isOpen: boolean;
  animationDelay?: number;
}

export const useModal = (props: UseModalProps) => {
  const {
    isOpen,
    animationDelay,
    onClose,
  } = props;

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

  const close = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      if (animationDelay) {
        timerRef.current = setTimeout(() => {
          onClose();
          setIsOpening(false);
          setIsClosing(false);
          setIsMounted(false);
        }, animationDelay);
      }
    }
  }, [animationDelay, onClose]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
    }
  }, [close]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return {
    isOpening,
    isClosing,
    isMounted,
    close,
  };
};
