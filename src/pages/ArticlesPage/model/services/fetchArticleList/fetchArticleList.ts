import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { getArticlesPageLimit } from "pages/ArticlesPage/model/selectors/articlesPageSelectors";

interface FetchArticleListOptions {
  page?: number;
}

export const fetchArticleList = createAsyncThunk<Article[], FetchArticleListOptions, ThunkConfig<string>>(
  "articlesPage/fetchArticleList",
  async(options, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const { page = 1 } = options;
    const limit = getArticlesPageLimit(getState());

    try {
      const response = await extra.api.get<Article[]>("/articles", {
        params: {
          _expand: "user",
          _limit: limit,
          _page: page,
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
