import { memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./CommentCard.module.scss";
import { Comment } from "../../model/types/comment";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Text } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { HStack, VStack } from "shared/ui/Stack";

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: PropsWithChildren<CommentCardProps>) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <VStack gap={16} max className={classNames(styles.CommentCard, {}, [className, styles.loading])}>
        <HStack gap={8} max className={styles.header}>
          <Skeleton width={35} height={35} borderRadius={"50%"} />
          <Skeleton className={styles.username} width={100} height={16} />
        </HStack>
        <Skeleton className={styles.text} width={"100%"} height={50} />
      </VStack>
    );
  }

  if (!comment) return null;

  return (
    <VStack gap={16} max className={classNames(styles.CommentCard, {}, [className])}>
      <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={styles.header}>
        <HStack gap={8} max>
          { comment?.user.avatar && <Avatar size={35} src={comment.user.avatar} /> }
          <Text className={styles.username} title={comment.user.username} />
        </HStack>
      </AppLink>
      <Text className={styles.text} text={comment.text} />
    </VStack>
  );
});
