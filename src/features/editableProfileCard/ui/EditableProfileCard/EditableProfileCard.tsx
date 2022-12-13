import { FC, useCallback } from "react";
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
import { getProfileError } from "../../model/selectors/getProfileError/getProfileError";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { getUserAuthData } from "entities/User";
import { HStack, VStack } from "shared/ui/Stack";

const reducers: ReducerList = {
  profile: profileReducer,
};

interface EditableProfileCardProps {
  profileId: string;
}

export const EditableProfileCard: FC<EditableProfileCardProps> = (props) => {
  const { profileId } = props;
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
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

  useInitialEffect(() => {
    dispatch(fetchProfileData(profileId));
  });

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

  const canEdit = authData?.id === profileId;

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack gap={16} max>
        {validateErrors?.length && validateErrors.map((error, i) => (
          <Text
            key={i}
            theme={TextTheme.ERROR}
            text={validateErrorTranslates[error]}
            data-testid={"EditableProfileCard.Error"}
          />
        ))}
        <HStack max className={styles.wrapper}>
          {canEdit && (
            <HStack gap={16} className={styles.buttonsGroup}>
              {readonly
                ? (
                  <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={handleEdit}
                    data-testid={"EditableProfileCard.EditButton"}
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
                      data-testid={"EditableProfileCard.CancelButton"}
                    >
                      {t("Отменить")}
                    </Button>
                    <Button
                      theme={ButtonTheme.OUTLINE}
                      onClick={handleSave}
                      data-testid={"EditableProfileCard.SaveButton"}
                    >
                      {t("Сохранить")}
                    </Button>
                  </>
                  )}
            </HStack>
          )}
          <ProfileCard
            readonly={readonly}
            data={formData}
            isLoading={isLoading}
            error={error}
            onInputChange={handleUpdateProfile}
          />
        </HStack>
      </VStack>

    </DynamicModuleLoader>
  );
};
