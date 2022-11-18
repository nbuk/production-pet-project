import { FC, memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticlesPage.module.scss";
import { ArticleList, ArticleView } from "entities/Article";

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<PropsWithChildren<ArticlesPageProps>> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(styles.ArticlesPage, {}, [className])}>
      <ArticleList
        articles={[]}
        view={ArticleView.PLATE}
      />
    </div>
  );
};

export default memo(ArticlesPage);
