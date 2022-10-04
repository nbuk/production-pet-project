import { FC, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import "./Loader.scss";

interface LoaderProps {
  className?: string;
}

export const Loader: FC<PropsWithChildren<LoaderProps>> = (props) => {
  const { className } = props;
  return (
    <div className={classNames("lds-ring", {}, [className])}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
