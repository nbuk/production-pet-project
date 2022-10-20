import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./LoginForm.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button";
import { Input } from "shared/ui/Input/Input";
import { ButtonTheme } from "shared/ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { AnyAction } from "@reduxjs/toolkit";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const initialReducers: ReducerList = {
  loginForm: loginReducer,
};

export interface LoginFormProps {
  className?: string;
}

const LoginForm = memo((props: LoginFormProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

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
    <DynamicModuleLoader
      reducers={initialReducers}
      removeAfterUnmount
    >
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
    </DynamicModuleLoader>
  );
});

export default LoginForm;
