import { FC, useCallback, useEffect } from "react";
import { Profile, ProfileCard } from "entities/Profile";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileError } from "../../model/selectors/getProfileError/getProfileError";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { profileActions, profileReducer } from "../../model/slice/profileSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchProfileData } from "../../model/services/fetchProfileData/fetchProfileData";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { getProfileForm } from "../../model/selectors/getProfileForm/getProfileForm";
import styles from "./EditableProfileCard.module.scss";
import { updateProfileData } from "features/EditableProfileCard/model/services/updateProfileData/updateProfileData";

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

  useEffect(() => {
    dispatch(fetchProfileData());
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
