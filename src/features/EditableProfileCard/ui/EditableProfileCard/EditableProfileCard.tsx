import { FC, useCallback, useEffect } from "react";
import { Profile, ProfileCard } from "entities/Profile";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { profileActions, profileReducer } from "../../model/slice/profileSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchProfileData } from "../../model/services/fetchProfileData/fetchProfileData";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { getProfileForm } from "../../model/selectors/getProfileForm/getProfileForm";
import styles from "./EditableProfileCard.module.scss";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { getProfileValidateErrors } from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { ValidateProfileError } from "../../model/types/profile";
import { getProfileError } from "features/EditableProfileCard/model/selectors/getProfileError/getProfileError";

const reducers: ReducerList = {
  profile: profileReducer,
};

export const EditableProfileCard: FC = () => {
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const readonly = useSelector(getProfileReadonly);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const validateErrors = useSelector(getProfileValidateErrors);

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t("Серверная ошибка при сохранении"),
    [ValidateProfileError.INCORRECT_COUNTRY]: t("Некорректная регион"),
    [ValidateProfileError.INCORRECT_AGE]: t("Некорректный возраст"),
    [ValidateProfileError.INCORRECT_USER_DATA]: t("Имя и фамилия обязательны"),
    [ValidateProfileError.NO_DATA]: t("Данные не указаны"),
  };

  useEffect(() => {
    if (__PROJECT__ !== "storybook") {
      dispatch(fetchProfileData());
    }
  }, [dispatch]);

  const handleEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const handleCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const handleSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  const handleUpdateProfile = useCallback((key: keyof Profile, value: string | number) => {
    dispatch(profileActions.updateProfile({ [key]: value }));
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={styles.buttonsGroup}>
        {readonly
          ? (
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={handleEdit}
            >
              {t("Редактировать")}
            </Button>
            )
          : (
            <>
              <Button
                className={styles.cancelBtn}
                theme={ButtonTheme.OUTLINE_RED}
                onClick={handleCancelEdit}
              >
                {t("Отменить")}
              </Button>
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={handleSave}
              >
                {t("Сохранить")}
              </Button>
            </>
            )}
      </div>
      {validateErrors?.length && validateErrors.map((error, i) => (
        <Text key={i} theme={TextTheme.ERROR} text={validateErrorTranslates[error]} />
      ))}
      <ProfileCard
        readonly={readonly}
        data={formData}
        isLoading={isLoading}
        error={error}
        onInputChange={handleUpdateProfile}
      />
    </DynamicModuleLoader>
  );
};
