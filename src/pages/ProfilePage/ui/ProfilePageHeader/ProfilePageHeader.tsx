import { FC, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ProfilePageHeader.module.scss";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader: FC<PropsWithChildren<ProfilePageHeaderProps>> = (props) => {
  const { className } = props;
  const { t } = useTranslation("profile");

  return (
    <div className={classNames(styles.ProfilePageHeader, {}, [className])}>
      <Text title={t("Профиль")} />
    </div>
  );
};
