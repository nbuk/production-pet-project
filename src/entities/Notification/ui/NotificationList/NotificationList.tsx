import { memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./NotificationList.module.scss";
import { useNotifications } from "../../api/notificationApi";
import { VStack } from "shared/ui/Stack";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import { Skeleton } from "shared/ui/Skeleton";

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: PropsWithChildren<NotificationListProps>) => {
  const { className } = props;
  const { data: notifications, isLoading } = useNotifications(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <VStack
        className={classNames(styles.NotificationList, {}, [className])}
        gap={16}
      >
        <Skeleton width={"100%"} borderRadius={"8px"} height={"90px"} />
        <Skeleton width={"100%"} borderRadius={"8px"} height={"90px"} />
        <Skeleton width={"100%"} borderRadius={"8px"} height={"90px"} />
      </VStack>
    );
  }

  return (
    <VStack
      className={classNames(styles.NotificationList, {}, [className])}
      gap={16}
    >
      {notifications?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  );
});
