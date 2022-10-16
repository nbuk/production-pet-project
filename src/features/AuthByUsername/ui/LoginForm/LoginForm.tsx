import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./LoginForm.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button";
import { Input } from "shared/ui/Input/Input";
import { ButtonTheme } from "shared/ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../model/slice/loginSlice";
import { getLoginState } from "../../model/selectors/getLoginState/getLoginState";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { AnyAction } from "@reduxjs/toolkit";
import { Text, TextTheme } from "shared/ui/Text/Text";

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username, password, isLoading, error } = useSelector(getLoginState);

  const handleChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUserName(value));
  }, [dispatch]);

  const handleChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const handleLoginClicked = useCallback(() => {
    dispatch(loginByUsername({ username, password }) as unknown as AnyAction);
  }, [dispatch, username, password]);

  return (
    <div className={classNames(styles.LoginForm, {}, [className])}>
      <Text className={styles.title} title={t("Форма авторизации")} />
      {error && <Text className={styles.error} text={t("Неверные логин/пароль")} theme={TextTheme.ERROR} />}
      <Input
        autofocus
        className={styles.input} type={"text"}
        placeholder={t("Введите username")}
        value={username}
        onChange={handleChangeUsername}
      />
      <Input
        className={styles.input} type={"text"}
        placeholder={t("Введите пароль")}
        value={password}
        onChange={handleChangePassword}
      />
      <Button
        className={classNames(styles.loginBtn)}
        theme={ButtonTheme.OUTLINE}
        onClick={handleLoginClicked}
        disabled={isLoading}
      >
        {t("Войти")}
      </Button>
    </div>
  );
});
