import { memo, PropsWithChildren } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./NotificationItem.module.scss";
import { Notification } from "../../model/types/notification";
import { Card, CardTheme } from "@/shared/ui/Card";
import { Text } from "@/shared/ui/Text";
import { AppLink } from "@/shared/ui/AppLink";

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo((props: PropsWithChildren<NotificationItemProps>) => {
  const { className, item } = props;

  const content = (
    <Card theme={CardTheme.OUTLINED} className={classNames(styles.NotificationItem, {}, [className])}>
      <Text title={item.title} text={item.description} />
    </Card>
  );

  if (item.href) {
    return (
      <AppLink className={styles.link} to={item.href}>
        {content}
      </AppLink>
    );
  }

  return content;
});
