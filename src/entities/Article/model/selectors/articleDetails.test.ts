import { StateSchema } from "@/app/providers/StoreProvider";
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from "./articleDetails";
import { Article, ArticleType } from "../types/article";

describe("articleDetails selector", () => {
  test("should return data", () => {
    const data: Article = {
      id: "1",
      user: {
        id: "1",
        username: "admin",
      },
      title: "Some title",
      img: "123",
      createdAt: "1.01.2001",
      views: 1,
      subtitle: "subtitle",
      type: [ArticleType.IT],
      blocks: [],
    };

    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data,
      },
    };

    expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
  });

  test("should work with empty state data", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
  });

  test("should return isLoading", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      },
    };

    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
  });

  test("should return isLoading false when state is empty", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {},
    };

    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
  });

  test("should return error", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error: "error",
      },
    };

    expect(getArticleDetailsError(state as StateSchema)).toEqual("error");
  });

  test("should return undefined when state is empty", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {},
    };

    expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
  });
});
