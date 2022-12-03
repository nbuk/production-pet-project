import { combineReducers } from "@reduxjs/toolkit";
import { ArticleDetailsPageSchema } from "../types";
import { articleDetailsCommentReducer } from "./articleDetailsCommentSlice";
import { articleDetailsRecommendationsReducer } from "./articleDetailsRecomendations";

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  comments: articleDetailsCommentReducer,
  recommendations: articleDetailsRecommendationsReducer,
});
