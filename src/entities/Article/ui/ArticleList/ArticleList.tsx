import { HTMLAttributeAnchorTarget, memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text } from "shared/ui/Text";
import { TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { HStack, VStack } from "shared/ui/Stack";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
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
    target = "_self",
  } = props;
  const { t } = useTranslation("article");

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem key={article.id} className={styles.card} article={article} view={view} target={target} />
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(styles.ArticleList, {}, [styles[view], className])}>
        <Text size={TextSize.L} title={t("Статьи не найдены")} />
      </div>
    );
  }

  const Wrapper = view === ArticleView.LIST ? VStack : HStack;

  return (
    <Wrapper gap={16} max wrap className={classNames("", {}, [className])}>
       { articles.length > 0 && articles.map(renderArticle) }
      { isLoading && getSkeletons(view) }
    </Wrapper>
  );
});
