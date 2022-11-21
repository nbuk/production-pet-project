import { CounterSchema } from "entities/Counter";
import { UserSchema } from "entities/User";
import { LoginSchema } from "../../../../features/authByUsername";
import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { ProfileSchema } from "features/editableProfileCard/model/types/profile";
import { ArticleDetailsSchema } from "entities/Article";
import { ArticleDetailsCommentsSchema } from "pages/ArticleDetailsPage";
import { AddCommentFormSchema } from "features/addCommentForm";
import { ArticlePageSchema } from "pages/ArticlesPage";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;

  // Async reducers
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlePageSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}

export interface StoreWithReducerManager extends EnhancedStore<StateSchema> {
  reducerManager?: ReducerManager;
}
