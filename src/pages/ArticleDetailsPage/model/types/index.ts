import { ArticleDetailsCommentsSchema } from "pages/ArticleDetailsPage/model/types/ArticleDetailsCommentsSchema";
import {
  ArticleDetailsRecommendationsSchema,
} from "pages/ArticleDetailsPage/model/types/ArticleDetailsRecommendationsSchema";

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema;
  recommendations: ArticleDetailsRecommendationsSchema;
}
