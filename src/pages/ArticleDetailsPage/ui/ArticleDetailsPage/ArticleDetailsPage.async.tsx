import { lazy } from "react";

export const ArticleDetailsAsync = lazy(async() => await import("./ArticleDetailsPage"));
