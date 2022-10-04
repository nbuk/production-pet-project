import { FC, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./PageLoader.module.scss";
import { Loader } from "shared/ui/Loader/Loader";

interface PageLoaderProps {
  className?: string;
}

export const PageLoader: FC<PropsWithChildren<PageLoaderProps>> = (props) => {
  const { className } = props;
  return (
    <div className={classNames(styles.PageLoader, {}, [className])}>
      <Loader />
    </div>
  );
};
