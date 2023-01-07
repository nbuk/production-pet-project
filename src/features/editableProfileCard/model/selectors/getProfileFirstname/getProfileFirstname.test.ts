import { StateSchema } from "@/app/providers/StoreProvider";
import { getProfileFirstname } from "./getProfileFirstname";

describe("getProfileData", () => {
  test("should return form data", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        data: {
          firstname: "Nikolay",
        },
      },
    };

    expect(getProfileFirstname(state as StateSchema)).toEqual("Nikolay");
  });

  test("should return empty string when state is empty", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileFirstname(state as StateSchema)).toEqual("");
  });
});
