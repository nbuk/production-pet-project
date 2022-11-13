import { memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticleCodeBlockComponent.module.scss";
import { ArticleCodeBlock } from "../../model/types/article";
import { Code } from "shared/ui/Code/Code";

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo((props: PropsWithChildren<ArticleCodeBlockComponentProps>) => {
  const { className, block } = props;

  return (
    <div className={classNames(styles.ArticleCodeBlockComponent, {}, [className])}>
      <Code codeText={block.code} />
    </div>
  );
});
