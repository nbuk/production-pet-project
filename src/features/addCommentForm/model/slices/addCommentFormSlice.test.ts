import { AddCommentFormSchema } from "features/addCommentForm";
import { addCommentFormActions, addCommentFormReducer } from "features/addCommentForm/model/slices/addCommentFormSlice";

describe("addCommentFormSlice", () => {
  test("test set text", () => {
    const state: DeepPartial<AddCommentFormSchema> = {
      text: "",
    };

    expect(addCommentFormReducer(state as AddCommentFormSchema, addCommentFormActions.setText("comment text"))).toEqual({ text: "comment text" });
  });
});
