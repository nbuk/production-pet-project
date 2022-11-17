import { StateSchema } from "app/providers/StoreProvider";
import { getProfileForm } from "./getProfileForm";
import { Country } from "entities/Country";

describe("getProfileData", () => {
  test("should return form data", () => {
    const data = {
      firstname: "Nikolay",
      lastname: "Bukharin",
      age: 26,
      country: Country.Russia,
      city: "Moscow",
      username: "nbuk",
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data,
      },
    };

    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
