import { AsyncThunkAction } from "@reduxjs/toolkit";
import { StateSchema, ThunkConfig } from "app/providers/StoreProvider";
import axios, { AxiosStatic } from "axios";

type ActionCreatorType<Returned, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<Returned, Arg, ThunkConfig<RejectedValue>>;

jest.mock("axios");

const mockedAxios = jest.mocked(axios, { shallow: false });

export class TestAsyncThunk<Returned, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>;
  getState: () => StateSchema;
  actionCreator: ActionCreatorType<Returned, Arg, RejectedValue>;
  api: jest.MockedFunctionDeep<AxiosStatic>;
  navigate: jest.MockedFn<any>;

  constructor(actionCreator: ActionCreatorType<Returned, Arg, RejectedValue>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();
    this.navigate = jest.fn();
    this.api = mockedAxios;
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);

    return action(this.dispatch, this.getState, { api: this.api, navigate: this.navigate });
  }
}
