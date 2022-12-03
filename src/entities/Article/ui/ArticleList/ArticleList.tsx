import { memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text } from "shared/ui/Text";
import { TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("article");

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem key={article.id} className={styles.card} article={article} view={view} />
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
        <Text size={TextSize.L} title={t("Статьи не найдены")} />
      </div>
    );
  }

  return (
    <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
       { articles.length > 0 && articles.map(renderArticle) }
       { isLoading && getSkeletons(view) }
    </div>
  );
});
