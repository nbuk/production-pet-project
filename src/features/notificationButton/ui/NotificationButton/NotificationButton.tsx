import { classNames } from "shared/lib/classNames/classNames";
import { memo } from "react";
import { Button, ButtonTheme } from "shared/ui/Button";
import { Icon } from "shared/ui/Icon";
import NotificationIcon from "shared/assets/icons/notification.svg";
import { NotificationList } from "entities/Notification";
import styles from "./NotificationButton.module.scss";
import { Popover } from "shared/ui/Popups";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  return (
    <Popover
      className={classNames(styles.NotificationButton, {}, [className])}
      direction={"bottom-left"}
      trigger={(
        <Button theme={ButtonTheme.CLEAR}>
            <Icon Svg={NotificationIcon} inverted />
        </Button>
      )}
    >
        <NotificationList className={styles.notifications} />
    </Popover>
  );
});
