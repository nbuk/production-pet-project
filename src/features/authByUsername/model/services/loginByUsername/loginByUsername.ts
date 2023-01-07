import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, userActions } from "@/entities/User";
import { USER_LOCALSTORAGE_KEY } from "@/shared/consts/localStorage";
import { ThunkConfig } from "@/app/providers/StoreProvider";

interface AuthData {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<User, AuthData, ThunkConfig<string>>("login/loginByUsername", async(authData, thunkApi) => {
  const { dispatch, extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.post<User>("/login", authData);

    if (!response.data) {
      return rejectWithValue("error");
    }

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
    dispatch(userActions.setAuthData(response.data));

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("Неверный логин/пароль");
  }
});
