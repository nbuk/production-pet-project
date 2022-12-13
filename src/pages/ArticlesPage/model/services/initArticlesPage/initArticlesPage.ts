import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlePageSlice";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";
import { SortOrder } from "shared/types";
import { ArticleSortField } from "entities/Article";

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  "articlesPage/initArticlesPage",
  async(searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    const inited = getArticlesPageInited(getState());

    if (inited) return;

    const order = searchParams.get("order") as SortOrder;
    const sort = searchParams.get("sort") as ArticleSortField;
    const search = searchParams.get("search");

    dispatch(articlesPageActions.initState());

    if (order) {
      dispatch(articlesPageActions.setOrder(order));
    }

    if (sort) {
      dispatch(articlesPageActions.setSort(sort));
    }

    if (search) {
      dispatch(articlesPageActions.setSearch(search));
    }

    dispatch(fetchArticleList({}));
  });
