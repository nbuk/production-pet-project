import { StateSchema } from "@/app/providers/StoreProvider";
import { getProfileData } from "./getProfileData";
import { Country } from "@/entities/Country";

describe("getProfileData", () => {
  test("should return data", () => {
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
        data,
      },
    };

    expect(getProfileData(state as StateSchema)).toEqual(data);
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
