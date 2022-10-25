import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema, StoreWithReducerManager } from "./StateSchema";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { createReducerManager } from "./reducerManager";
import { $api } from "shared/api/api";
import { To } from "@remix-run/router";
import { NavigateOptions } from "react-router/dist/lib/context";
import { CombinedState, Reducer } from "redux";

export function createReduxStore(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>, navigate?: (to: To, options?: NavigateOptions) => void) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store: StoreWithReducerManager = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api,
          navigate,
        },
      },
    }),
  });

  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
