import { FC, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ProfileCard.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { Text } from "shared/ui/Text/Text";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard: FC<PropsWithChildren<ProfileCardProps>> = (props) => {
  const { className } = props;
  const { t } = useTranslation("profile");
  const data = useSelector(getProfileData);
  // const error = useSelector(getProfileError);
  // const isLoading = useSelector(getProfileIsLoading);

  return (
    <div className={classNames(styles.ProfileCard, {}, [className])}>
      <div className={styles.header}>
        <Text title={t("Профиль")} />
        <Button className={styles.editBtn} theme={ButtonTheme.OUTLINE}>{t("Редактировать")}</Button>
      </div>
      <div className={styles.data}>
        <Input
          value={data?.firstname}
          placeholder={t("Ваша имя")}
          className={styles.input}
        />
        <Input
          value={data?.lastname}
          placeholder={t("Ваша фамилия")}
          className={styles.input}
        />
      </div>
    </div>
  );
};
