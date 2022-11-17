import { StateSchema } from "app/providers/StoreProvider";
import { getProfileValidateErrors } from "./getProfileValidateErrors";
import { ValidateProfileError } from "../../types/profile";

describe("getProfileValidateErrors", () => {
  test("should return validate errors", () => {
    const validateErrors = [ValidateProfileError.SERVER_ERROR, ValidateProfileError.INCORRECT_USER_DATA];

    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors,
      },
    };

    expect(getProfileValidateErrors(state as StateSchema)).toEqual(validateErrors);
  });

  test("should return undefined when errors is empty", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
