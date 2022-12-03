import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlePageSlice";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  "articlesPage/fetchNextArticlesPage",
  async(options, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getArticlesPageHasMore(getState());
    const page = getArticlesPageNum(getState());
    const isLoading = getArticlesPageIsLoading(getState());

    if (!hasMore || isLoading) return;

    dispatch(articlesPageActions.setPage(page + 1));
    dispatch(fetchArticleList({}));
  });
