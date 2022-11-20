import { memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.PLATE ? 9 : 3).fill(0).map((item, index) => (
  <ArticleListItemSkeleton className={styles.card} key={index} view={view} />
));

export const ArticleList = memo((props: PropsWithChildren<ArticleListProps>) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.LIST,
  } = props;

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem key={article.id} className={styles.card} article={article} view={view} />
    );
  };

  return (
    <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
       { articles.length > 0
         ? (
             articles.map(renderArticle)
           )
         : null }
       { isLoading && getSkeletons(view) }
    </div>
  );
});
