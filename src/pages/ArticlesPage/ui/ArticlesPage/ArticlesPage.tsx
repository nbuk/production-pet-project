import { FC, memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticlesPage.module.scss";
import { useTranslation } from "react-i18next";

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<PropsWithChildren<ArticlesPageProps>> = (props) => {
  const { className } = props;
  const { t } = useTranslation("article");

  return (
    <div className={classNames(styles.ArticlesPage, {}, [className])}>
      ARTICLES PAGE
    </div>
  );
};

export default memo(ArticlesPage);
