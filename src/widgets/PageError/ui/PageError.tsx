import { FC, PropsWithChildren } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./PageError.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/Button";

interface PageErrorProps {
  className?: string;
}

export const PageError: FC<PropsWithChildren<PageErrorProps>> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  const reloadPage = (): void => {
    location.reload();
  };

  return (
    <div className={classNames(styles.PageError, {}, [className])}>
      {t("Произошла непредвиденная ошибка")}
      <Button onClick={reloadPage}>{t("Перезагрузить страницу")}</Button>
    </div>
  );
};
