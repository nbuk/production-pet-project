import { fetchProfileData } from "./fetchProfileData";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Country } from "entities/Country";

const data = {
  firstname: "Nikolay",
  lastname: "Bukharin",
  age: 26,
  country: Country.Russia,
  city: "Moscow",
  username: "nbuk",
};

describe("fetchProfileData", () => {
  test("success", async() => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk("1");

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toEqual("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("error", async() => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk("1");

    expect(result.meta.requestStatus).toEqual("rejected");
  });
});
