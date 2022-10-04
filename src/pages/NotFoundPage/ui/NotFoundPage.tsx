import { FC, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./NotFoundPage.module.scss";
import { useTranslation } from "react-i18next";

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage: FC<PropsWithChildren<NotFoundPageProps>> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.NotFoundPage, {}, [className])}>
      {t("Страница не найдена")}
    </div>
  );
};
