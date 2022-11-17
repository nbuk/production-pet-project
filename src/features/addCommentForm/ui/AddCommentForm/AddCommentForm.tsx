import { FC, PropsWithChildren, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./AddCommentForm.module.scss";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { getAddCommentFormText } from "../../model/selectors/addCommentFormSelectors";
import { useSelector } from "react-redux";
import { addCommentFormActions, addCommentFormReducer } from "../../model/slices/addCommentFormSlice";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

const reducers: ReducerList = {
  addCommentForm: addCommentFormReducer,
};

interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const AddCommentForm: FC<PropsWithChildren<AddCommentFormProps>> = (props) => {
  const { className, onSendComment } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);

  const handleTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, [dispatch]);

  const handleSendComment = useCallback(() => {
    handleTextChange("");
    if (text) {
      onSendComment(text);
    }
  }, [handleTextChange, text, onSendComment]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(styles.AddCommentForm, {}, [className])}>
        <Input
          className={styles.input}
          placeholder={t("Введите текст комментария")}
          value={text}
          onChange={handleTextChange}
        />
        <Button
          theme={ButtonTheme.OUTLINE}
          onClick={handleSendComment}
        >
          {t("Отправить")}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;
