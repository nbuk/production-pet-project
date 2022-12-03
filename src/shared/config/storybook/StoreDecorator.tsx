import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { loginReducer } from "features/authByUsername/model/slice/loginSlice";
import { ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "entities/Article/model/slices/articleSlice";
import { profileReducer } from "features/editableProfileCard/model/slice/profileSlice";
import { addCommentFormReducer } from "features/addCommentForm/model/slices/addCommentFormSlice";
import { articleDetailsCommentReducer } from "pages/ArticleDetailsPage/model/slice/articleDetailsCommentSlice";
import { articlesPageReducer } from "pages/ArticlesPage/model/slices/articlePageSlice";

const defaultReducers: ReducerList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  articlesPage: articlesPageReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsComments: articleDetailsCommentReducer,
};

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducerList) => (StoryComponent: Story) => {
  return (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultReducers, ...asyncReducers }} >
      <StoryComponent />
    </StoreProvider>
  );
};
