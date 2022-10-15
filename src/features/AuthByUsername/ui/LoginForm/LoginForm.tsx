import { FC, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./LoginForm.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button";
import { Input } from "shared/ui/Input/Input";

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<PropsWithChildren<LoginFormProps>> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(styles.LoginForm, {}, [className])}>
      <Input
        autofocus
        className={styles.input} type={"text"}
        placeholder={t("Введите username")}
      />
      <Input
        className={styles.input} type={"text"}
        placeholder={t("Введите пароль")}
      />
      <Button className={classNames(styles.loginBtn)}>{t("Войти")}</Button>
    </div>
  );
};
