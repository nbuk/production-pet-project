import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { getLoginState } from "features/AuthByUsername/model/selectors/getLoginState/getLoginState";

describe("getLoginState", () => {
  test("should return login state", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: { username: "123", password: "123", isLoading: false },
    };

    expect(getLoginState(state as StateSchema)).toEqual({ username: "123", password: "123", isLoading: false });
  });

  test("should return undefined when state is empty", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginState(state as StateSchema)).toEqual(undefined);
  });
});
