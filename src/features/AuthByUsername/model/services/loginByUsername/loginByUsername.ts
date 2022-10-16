import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, userActions } from "entities/User";
import { USER_LOCALSTORAGE_KEY } from "shared/conts/localStorage";

interface AuthData {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<User, AuthData, { rejectValue: string; }>("login/loginByUsername", async(authData, thunkApi) => {
  try {
    const response = await axios.post("http://localhost:8000/login", authData);

    if (!response.data) {
      return thunkApi.rejectWithValue("error");
    }

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
    thunkApi.dispatch(userActions.setAuthData(response.data));

    return response.data;
  } catch (e) {
    console.log(e);
    return thunkApi.rejectWithValue("Неверный логин/пароль");
  }
});
