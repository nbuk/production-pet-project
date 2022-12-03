import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchNextArticlesPage } from "./fetchNextArticlesPage";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";

jest.mock("../fetchArticleList/fetchArticleList");

describe("fetchNextArticlesPage", () => {
  test("success", async() => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        hasMore: true,
        isLoading: false,
        limit: 5,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchArticleList).toHaveBeenCalled();
  });

  test("fetchArticleList not called", async() => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        hasMore: false,
        isLoading: false,
        limit: 5,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticleList).not.toHaveBeenCalled();
  });

  test("fetchArticleList not called while fetching articles", async() => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        hasMore: true,
        isLoading: true,
        limit: 5,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticleList).not.toHaveBeenCalled();
  });
});
