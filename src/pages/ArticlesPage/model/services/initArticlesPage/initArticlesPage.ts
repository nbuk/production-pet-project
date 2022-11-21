import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlePageSlice";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  "articlesPage/initArticlesPage",
  async(options, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    const inited = getArticlesPageInited(getState());

    if (inited) return;

    dispatch(articlesPageActions.initState());
    dispatch(fetchArticleList({ page: 1 }));
  });
