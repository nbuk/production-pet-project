import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { initArticlesPage } from "./initArticlesPage";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";

jest.mock("../fetchArticleList/fetchArticleList");

describe("initArticlesPage", () => {
  test("initialized first time", async() => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 1,
        _inited: false,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchArticleList).toHaveBeenCalledWith({ page: 1 });
  });

  test("fetchArticleList not called after initialization", async() => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 3,
        _inited: true,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticleList).not.toHaveBeenCalled();
  });
});
