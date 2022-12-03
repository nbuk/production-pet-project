import { getQueryParams } from "./addQueryParams";

describe("addQueryParams", () => {
  test("test with one param", () => {
    const params = getQueryParams({ test: "value" });

    expect(params).toBe("?test=value");
  });

  test("test with multiple params", () => {
    const params = getQueryParams({ test: "value", test2: "someValue" });

    expect(params).toBe("?test=value&test2=someValue");
  });

  test("test with undefined", () => {
    const params = getQueryParams({
      test: "value",
      second: undefined,
    });

    expect(params).toBe("?test=value");
  });
});
