import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileSchema } from "../types/profile";
import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData";
import { Profile } from "@/entities/Profile";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";

const initialState: ProfileSchema = {
  isLoading: false,
  readonly: true,
  error: undefined,
  data: undefined,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    cancelEdit: (state) => {
      state.readonly = true;
      state.validateErrors = undefined;
      if (state.data) {
        state.form = state.data;
      }
    },
    updateProfile: (state, action: PayloadAction<DeepPartial<Profile>>) => {
      if (!state.form) return;
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.form = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProfileData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
        state.validateErrors = undefined;
      })
      .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.readonly = true;
        state.data = action.payload;
        state.form = action.payload;
        state.validateErrors = undefined;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.validateErrors = action.payload;
        state.form = state.data;
        state.readonly = false;
        state.isLoading = false;
      });
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
