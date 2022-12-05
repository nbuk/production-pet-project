import { profileActions, profileReducer } from "./profileSlice";
import { ProfileSchema, ValidateProfileError } from "../types/profile";
import { Country } from "entities/Country";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";

const data = {
  id: "1",
  firstname: "Nikolay",
  lastname: "Bukharin",
  age: 26,
  country: Country.Russia,
  city: "Moscow",
  username: "nbuk",
};

describe("profileSlice", () => {
  test("test set readonly", () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };

    expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({ readonly: true });
  });

  test("test cancel edit", () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false, validateErrors: undefined, data, form: { username: "" } };

    expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual({ readonly: true, validateErrors: undefined, data, form: data });
  });

  test("test update profile", () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: "old name" } };

    expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ username: "new name" }))).toEqual({ form: { username: "new name" } });
  });

  test("test update profile service pending", () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: false, validateErrors: [ValidateProfileError.SERVER_ERROR] };

    expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({ isLoading: true, validateErrors: undefined });
  });

  test("test update profile service fulfilled", () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: true, validateErrors: [ValidateProfileError.SERVER_ERROR] };

    expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, ""))).toEqual({
      isLoading: false,
      readonly: true,
      validateErrors: undefined,
      data,
      form: data,
    });
  });

  test("test update profile service rejected", () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: true, data };

    expect(profileReducer(state as ProfileSchema, updateProfileData.rejected)).toEqual({
      isLoading: false,
      readonly: false,
      validateErrors: undefined,
      data,
      form: data,
    });
  });
});
