import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Profile } from "@/entities/Profile";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfile } from "../../services/validateProfile/validateProfile";
import { ValidateProfileError } from "../../types/profile";

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
  "profile/updateProfileData",
  async(_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const formData = getProfileForm(getState());

    if (!formData) {
      return rejectWithValue([ValidateProfileError.NO_DATA]);
    }

    const errors = validateProfile(formData);

    if (errors.length) {
      return rejectWithValue(errors);
    }

    try {
      const response = await extra.api.put<Profile>(`/profile/${formData.id}`, formData);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
  });
