import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ArticleDetailsRecommendationsSchema } from "../types/ArticleDetailsRecommendationsSchema";
import { StateSchema } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { fetchRecommendations } from "../services/fetchRecommendations/fetchRecommendations";

const initialState: ArticleDetailsRecommendationsSchema = {
  isLoading: false,
  error: undefined,
  ids: [],
  entities: {},
};

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.recommendations ?? recommendationsAdapter.getInitialState(),
);

export const articleDetailsRecommendationsSlice = createSlice({
  name: "articleDetailsRecommendations",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleDetailsRecommendationsActions } = articleDetailsRecommendationsSlice;
export const { reducer: articleDetailsRecommendationsReducer } = articleDetailsRecommendationsSlice;
