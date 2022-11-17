import { updateProfileData } from "./updateProfileData";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Country } from "entities/Country";
import { ValidateProfileError } from "../../types/profile";

const data = {
  firstname: "Nikolay",
  lastname: "Bukharin",
  age: 26,
  country: Country.Russia,
  city: "Moscow",
  username: "nbuk",
};

describe("updateProfileData", () => {
  test("success", async() => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      user: {
        authData: {
          id: "1",
        },
      },
      profile: {
        form: data,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toEqual("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("error", async() => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      user: {
        authData: {
          id: "1",
        },
      },
      profile: {
        form: data,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toEqual("rejected");
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
  });

  test("validate error", async() => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      user: {
        authData: {
          id: "1",
        },
      },
      profile: {
        form: {
          ...data,
          firstname: "",
        },
      },
    });
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toEqual("rejected");
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
});
