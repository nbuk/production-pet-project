import { FC, memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticlesPage.module.scss";

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<PropsWithChildren<ArticlesPageProps>> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(styles.ArticlesPage, {}, [className])}></div>
  );
};

export default memo(ArticlesPage);
