import { memo } from "react";
import { useTranslation } from "react-i18next";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { profileReducer } from "entities/Profile";

const reducers: ReducerList = {
  profile: profileReducer,
};

const ProfilePage = memo(() => {
  const { t } = useTranslation("profile");

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div>{t("Страница профиля")}</div>
    </DynamicModuleLoader>
  );
});

export default ProfilePage;
