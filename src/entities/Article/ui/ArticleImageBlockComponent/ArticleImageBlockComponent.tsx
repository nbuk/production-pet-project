import { memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticleImageBlockComponent.module.scss";
import { ArticleImageBlock } from "../../model/types/article";
import { Text, TextAlign } from "shared/ui/Text/Text";

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: PropsWithChildren<ArticleImageBlockComponentProps>) => {
  const { className, block } = props;

  return (
    <div className={classNames(styles.ArticleImageBlockComponent, {}, [className])}>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={block.src} alt={block.title} />
      </div>
      {block.title && <Text text={block.title} textTag={"span"} align={TextAlign.CENTER} />}
    </div>
  );
});
