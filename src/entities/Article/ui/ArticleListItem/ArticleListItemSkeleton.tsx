import { memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticleListItem.module.scss";
import { ArticleView } from "../../model/types/article";
import { Card } from "shared/ui/Card";
import { Skeleton } from "shared/ui/Skeleton";
import { VStack } from "shared/ui/Stack";

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo((props: PropsWithChildren<ArticleListItemSkeletonProps>) => {
  const { className, view } = props;

  if (view === ArticleView.LIST) {
    return (
      <VStack max className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
         <Card className={styles.card}>
          <div className={styles.header}>
            <Skeleton width={30} height={30} borderRadius={"50%"} />
            <Skeleton className={styles.username} width={150} height={16} />
            <Skeleton className={styles.date} width={150} height={16} />
          </div>
          <Skeleton className={styles.title} width={250} height={24} />
          <Skeleton className={styles.image} height={200} />
          <div className={styles.footer} >
            <Skeleton width={200} height={36} />
          </div>
         </Card>
      </VStack>
    );
  }

  return (
    <div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
      <Card className={styles.card} >
        <div className={styles.imageWrapper}>
          <Skeleton className={styles.image} width={300} height={300} />
        </div>
        <div className={styles.infoWrapper}>
          <Skeleton width={210} height={16} />
        </div>
        <Skeleton width={300} height={16} className={styles.title} />
      </Card>
    </div>
  );
});
