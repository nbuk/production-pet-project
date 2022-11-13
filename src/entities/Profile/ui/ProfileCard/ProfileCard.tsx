import { FC, PropsWithChildren, useCallback } from "react";
import { classNames, Mods } from "shared/lib/classNames";
import styles from "./ProfileCard.module.scss";
import { useTranslation } from "react-i18next";
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import { Input } from "shared/ui/Input/Input";
import { Profile } from "../../model/types/profile";
import { Loader } from "shared/ui/Loader/Loader";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Currency, CurrencySelect } from "entities/Currency";
import { Country, CountrySelect } from "entities/Country";

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  readonly?: boolean;
  isLoading?: boolean;
  error?: string;
  onInputChange?: (key: keyof Profile, value: string | number) => void;
}

export const ProfileCard: FC<PropsWithChildren<ProfileCardProps>> = (props) => {
  const {
    className,
    data,
    readonly,
    isLoading,
    error,
    onInputChange,
  } = props;
  const { t } = useTranslation("profile");

  const handleFirstnameChange = useCallback((value: string) => {
    onInputChange?.("firstname", value);
  }, [onInputChange]);

  const handleLastnameChange = useCallback((value: string) => {
    onInputChange?.("lastname", value);
  }, [onInputChange]);

  const handleCityChange = useCallback((value: string) => {
    onInputChange?.("city", value);
  }, [onInputChange]);

  const handleAgeChange = useCallback((value: string) => {
    if (value.length && !/^[0-9]+?$/g.test(value)) return;
    onInputChange?.("age", Number(value));
  }, [onInputChange]);

  const handleAvatarChange = useCallback((value: string) => {
    onInputChange?.("avatar", value);
  }, [onInputChange]);

  const handleUsernameChange = useCallback((value: string) => {
    onInputChange?.("username", value);
  }, [onInputChange]);

  const handleCurrencyChange = useCallback((value: Currency) => {
    onInputChange?.("currency", value);
  }, [onInputChange]);

  const handleCountryChange = useCallback((value: Country) => {
    onInputChange?.("country", value);
  }, [onInputChange]);

  if (isLoading) {
    return (
      <div className={classNames(styles.ProfileCard, {}, [className, styles.loading])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(styles.ProfileCard, {}, [className, styles.error])}>
        <Text
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
          title={t("Произошла ошибка при загрузке данных")}
          text={t("Попробуйте обновить страницу")}
        />
      </div>
    );
  }

  const mods: Mods = {
    [styles.editing]: !readonly,
  };

  return (
    <div className={classNames(styles.ProfileCard, mods, [className])}>
      {data?.avatar && (
        <Avatar className={styles.avatar} src={data.avatar} size={100} />
      )}
      <Input
        readonly={readonly}
        value={data?.firstname}
        placeholder={t("Ваша имя")}
        className={styles.input}
        onChange={handleFirstnameChange}
      />
      <Input
        readonly={readonly}
        value={data?.lastname}
        placeholder={t("Ваша фамилия")}
        className={styles.input}
        onChange={handleLastnameChange}
      />
      <Input
        readonly={readonly}
        value={data?.city}
        placeholder={t("Город")}
        className={styles.input}
        onChange={handleCityChange}
      />
      <Input
        readonly={readonly}
        value={data?.age?.toString()}
        placeholder={t("Возраст")}
        className={styles.input}
        onChange={handleAgeChange}
      />
      <Input
        readonly={readonly}
        value={data?.username}
        placeholder={t("Имя пользователя")}
        className={styles.input}
        onChange={handleUsernameChange}
      />
      <Input
        readonly={readonly}
        value={data?.avatar}
        placeholder={t("Ссылка на аватар")}
        className={styles.input}
        onChange={handleAvatarChange}
      />
      <CurrencySelect
        className={styles.input}
        readonly={readonly}
        value={data?.currency ?? Currency.RUB}
        onChange={handleCurrencyChange}
      />
      <CountrySelect
        className={styles.input}
        readonly={readonly}
        value={data?.country ?? Country.Russia}
        onChange={handleCountryChange}
      />
    </div>
  );
};
