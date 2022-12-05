import { FC, PropsWithChildren, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import { ArticleViewSelector } from "features/changeArticleView";
import { ArticlesSort } from "features/sortArticle";
import { useSelector } from "react-redux";
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { ArticleSortField, ArticleType, ArticleView } from "entities/Article";
import { articlesPageActions } from "../../model/slices/articlePageSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ArticlesSearch } from "features/searchArticle";
import { SortOrder } from "shared/types";
import { fetchArticleList } from "../../model/services/fetchArticleList/fetchArticleList";
import { useDebounce } from "shared/lib/hooks/useDebounce";
import { ArticleTypeTabs } from "features/changeArticleType";
import { HStack, VStack } from "shared/ui/Stack";

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters: FC<PropsWithChildren<ArticlesPageFiltersProps>> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesPageView);
  const sort = useSelector(getArticlesPageSort);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);
  const type = useSelector(getArticlesPageType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticleList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const handleViewChange = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  const handleOrderChange = useCallback((order: SortOrder) => {
    dispatch(articlesPageActions.setOrder(order));
    dispatch(articlesPageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  const handleSortChange = useCallback((sort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(sort));
    dispatch(articlesPageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  const handleSearchChange = useCallback((search: string) => {
    dispatch(articlesPageActions.setSearch(search));
    dispatch(articlesPageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  const handleTypeChange = useCallback((type: ArticleType) => {
    dispatch(articlesPageActions.setType(type));
    dispatch(articlesPageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  return (
    <VStack max gap={16} className={classNames("", {}, [className])}>
      <HStack max justify={"between"}>
        <ArticlesSort sort={sort} order={order} onOrderChange={handleOrderChange} onSortChange={handleSortChange} />
        <ArticleViewSelector view={view} onViewChange={handleViewChange} />
      </HStack>
      <ArticlesSearch searchText={search} onSearchChange={handleSearchChange} />
      <ArticleTypeTabs activeType={type} onTypeChange={handleTypeChange} />
    </VStack>
  );
};
