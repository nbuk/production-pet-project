import { validateProfile } from "./validateProfile";
import { Country } from "entities/Country";
import { ValidateProfileError } from "features/EditableProfileCard/model/types/profile";

const data = {
  firstname: "Nikolay",
  lastname: "Bukharin",
  age: 26,
  country: Country.Russia,
  city: "Moscow",
  username: "nbuk",
};

describe("validateProfile", () => {
  test("valid data", async() => {
    const result = validateProfile(data);

    expect(result).toEqual([]);
  });

  test("invalid firstname or lastname", async() => {
    const result = validateProfile({ ...data, firstname: "", lastname: "" });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test("invalid age", async() => {
    const result = validateProfile({ ...data, age: 0 });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  test("invalid all", async() => {
    const result = validateProfile({});

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_AGE, ValidateProfileError.INCORRECT_COUNTRY]);
  });
});
