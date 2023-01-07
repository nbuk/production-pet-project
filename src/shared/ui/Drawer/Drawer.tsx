import { FC, memo, ReactNode, useCallback, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useTheme } from "@/app/providers/ThemeProvider";
import styles from "./Drawer.module.scss";
import { Portal } from "../Portal/Portal";
import { Overlay } from "@/shared/ui/Overlay/Overlay";
import { useAnimationLibs } from "@/shared/lib/components/AnimationProvider";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

const height = window.innerHeight - 100;

const DrawerContent = memo((props: DrawerProps) => {
  const {
    className,
    children,
    onClose,
    isOpen,
  } = props;
  const { Spring, Gesture } = useAnimationLibs();
  const { theme } = useTheme();
  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

  const handleOpen = useCallback(() => {
    api.start({ y: 0, immediate: false });
  }, [api]);

  const handleClose = useCallback((velocity = 0) => {
    api.start({ y: height, immediate: false, config: { ...Spring.config.stiff, velocity }, onResolve: onClose });
  }, [api, onClose]);

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    }
  }, [handleOpen, isOpen]);

  const bind = Gesture.useDrag(
    ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel }) => {
      if (my < -70) cancel();

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          handleClose();
        } else {
          handleOpen();
        }
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    { from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true },
  );

  if (!isOpen) {
    return null;
  }

  const display = y.to((py) => (py < height ? "block" : "none"));

  return (
    <Portal>
      <div className={classNames(styles.Drawer, {}, [className, theme, "app_drawer"])}>
        <Overlay onClick={() => handleClose()} />
        <Spring.a.div
          className={styles.sheet}
          style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
});

export const Drawer: FC<DrawerProps> = (props) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) return null;

  return <DrawerContent {...props} >{props.children}</DrawerContent>;
};
