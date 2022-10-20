import { lazy, FC } from "react";
import { LoginFormProps } from "./LoginForm";

export const LoginFormAsync = lazy<FC<LoginFormProps>>(async() => await new Promise((resolve) => {
  setTimeout(() => {
    resolve(import ("./LoginForm"));
  }, 800);
}));
