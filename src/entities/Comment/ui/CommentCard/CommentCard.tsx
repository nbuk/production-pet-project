import { memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./CommentCard.module.scss";
import { Comment } from "../../model/types/comment";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Text } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: PropsWithChildren<CommentCardProps>) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <div className={classNames(styles.CommentCard, {}, [className, styles.loading])}>
        <div className={styles.header}>
          <Skeleton width={35} height={35} borderRadius={"50%"} />
          <Skeleton className={styles.username} width={100} height={16} />
        </div>
        <Skeleton className={styles.text} width={"100%"} height={50} />
      </div>
    );
  }

  if (!comment) return null;

  return (
    <div className={classNames(styles.CommentCard, {}, [className])}>
      <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={styles.header}>
        { comment?.user.avatar && <Avatar size={35} src={comment.user.avatar} /> }
        <Text className={styles.username} title={comment.user.username} />
      </AppLink>
      <Text className={styles.text} text={comment.text} />
    </div>
  );
});
