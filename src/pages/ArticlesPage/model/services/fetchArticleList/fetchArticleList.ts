import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Article, ArticleType } from "@/entities/Article";
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from "../../selectors/articlesPageSelectors";
import { addQueryParams } from "@/shared/lib/url/addQueryParams";

interface FetchArticleListParams {
  replace?: boolean;
}

export const fetchArticleList = createAsyncThunk<Article[], FetchArticleListParams, ThunkConfig<string>>(
  "articlesPage/fetchArticleList",
  async(options, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const limit = getArticlesPageLimit(getState());
    const sort = getArticlesPageSort(getState());
    const order = getArticlesPageOrder(getState());
    const search = getArticlesPageSearch(getState());
    const page = getArticlesPageNum(getState());
    const type = getArticlesPageType(getState());

    try {
      addQueryParams({ sort, order, search, type });
      const response = await extra.api.get<Article[]>("/articles", {
        params: {
          _expand: "user",
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search.length ? search : undefined,
          type: type === ArticleType.ALL ? undefined : type,
        },
      });

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue("error");
    }
  });
