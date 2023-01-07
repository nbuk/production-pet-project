import { memo, PropsWithChildren } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./ArticleViewSelector.module.scss";
import { ArticleView } from "@/entities/Article";
import ListIcon from "@/shared/assets/icons/list.svg";
import TiledIcon from "@/shared/assets/icons/tiled.svg";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewChange: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.PLATE,
    icon: TiledIcon,
  },
  {
    view: ArticleView.LIST,
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo((props: PropsWithChildren<ArticleViewSelectorProps>) => {
  const { className, view, onViewChange } = props;

  const handleClick = (view: ArticleView) => () => {
    onViewChange(view);
  };

  return (
    <div className={classNames(styles.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button key={viewType.view} theme={ButtonTheme.CLEAR} onClick={handleClick(viewType.view)} >
          <Icon className={classNames("", { [styles.notSelected]: viewType.view !== view })} Svg={viewType.icon} />
        </Button>
      ))}
    </div>
  );
});
