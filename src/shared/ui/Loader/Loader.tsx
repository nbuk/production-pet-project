import { memo } from "react";
import { classNames } from "shared/lib/classNames";
import "./Loader.scss";

interface LoaderProps {
  className?: string;
}

export const Loader = memo((props: LoaderProps) => {
  const { className } = props;
  return (
    <div className={classNames("lds-ring", {}, [className])}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
});
