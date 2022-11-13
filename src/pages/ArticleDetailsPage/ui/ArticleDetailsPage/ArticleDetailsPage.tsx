import { FC, memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticleDetailsPage.module.scss";
import { useTranslation } from "react-i18next";

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: FC<PropsWithChildren<ArticleDetailsPageProps>> = (props) => {
  const { className } = props;
  const { t } = useTranslation("article");

  return (
    <div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
      ARTICLES DETAILS PAGE
    </div>
  );
};

export default memo(ArticleDetailsPage);
