import { StateSchema } from "@/app/providers/StoreProvider";
import { getAddCommentFormError, getAddCommentFormText } from "./addCommentFormSelectors";

describe("addCommentFormSelectors", () => {
  describe("getAddCommentFormText", () => {
    test("should return text", () => {
      const state: DeepPartial<StateSchema> = {
        addCommentForm: {
          text: "some text",
        },
      };

      expect(getAddCommentFormText(state as StateSchema)).toEqual("some text");
    });

    test("should work with empty state", () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getAddCommentFormText(state as StateSchema)).toEqual("");
    });
  });

  describe("getAddCommentFormError", () => {
    test("should return error", () => {
      const state: DeepPartial<StateSchema> = {
        addCommentForm: {
          error: "error text",
        },
      };

      expect(getAddCommentFormError(state as StateSchema)).toEqual("error text");
    });

    test("should work with empty state", () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getAddCommentFormError(state as StateSchema)).toEqual(false);
    });
  });
});
