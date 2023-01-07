import { classNames } from "@/shared/lib/classNames/classNames";
import { memo, useCallback, useState } from "react";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";
import NotificationIcon from "@/shared/assets/icons/notification.svg";
import { NotificationList } from "@/entities/Notification";
import styles from "./NotificationButton.module.scss";
import { Popover } from "@/shared/ui/Popups";
import { Drawer } from "@/shared/ui/Drawer/Drawer";
import { isMobile } from "@/shared/lib/isMobile/isMobile";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <Button theme={ButtonTheme.CLEAR} onClick={handleOpenDrawer}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  );

  return isMobile()
    ? (
      <>
        {trigger}
        <Drawer isOpen={isOpen} onClose={handleCloseDrawer}>
          <NotificationList/>
        </Drawer>
      </>
      )
    : (
      <Popover
        className={classNames(styles.NotificationButton, {}, [className])}
        direction={"bottom-left"}
        trigger={trigger}
      >
        <NotificationList className={styles.notifications}/>
      </Popover>
      );
});
