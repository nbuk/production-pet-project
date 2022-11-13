import { memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticleTextBlockComponent.module.scss";
import { ArticleTextBlock } from "../../model/types/article";
import { Text } from "shared/ui/Text/Text";

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: PropsWithChildren<ArticleTextBlockComponentProps>) => {
  const { className, block } = props;

  return (
    <div className={classNames(styles.ArticleTextBlockComponent, {}, [className])}>
      {block.title && (
        <Text className={styles.title} title={block.title} />
      )}
      {block.paragraphs.map((paragraph, i) => (
        <Text className={styles.paragraph} key={i} text={paragraph} />
      ))}
    </div>
  );
});
