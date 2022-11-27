import { FC, memo, PropsWithChildren, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticlesPage.module.scss";
import { ArticleList, ArticleView } from "entities/Article";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articlesPageActions, articlesPageReducer, getArticles } from "../../model/slices/articlePageSlice";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getArticlesPageIsLoading, getArticlesPageView } from "../../model/selectors/articlesPageSelectors";
import { ArticleViewSelector } from "features/changeArticleView";
import { Page } from "widgets/Page/ui/Page";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";

const reducers: ReducerList = {
  articlesPage: articlesPageReducer,
};

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<PropsWithChildren<ArticlesPageProps>> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  // const error = useSelector(getArticlesPageError);

  useInitialEffect(() => {
    dispatch(initArticlesPage());
  });

  const handleViewChange = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  const handleLoadNexPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        className={classNames(styles.ArticlesPage, {}, [className])}
        onScrollEnd={handleLoadNexPart}
      >
        <ArticleViewSelector view={view} onViewChange={handleViewChange} />
        <ArticleList
          isLoading={isLoading}
          articles={articles}
          view={view}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
