import { memo, PropsWithChildren, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TabItem, Tabs } from "shared/ui/Tabs";
import { ArticleType } from "entities/Article";
import { classNames } from "shared/lib/classNames";

interface ArticleTypeTabsProps {
  className?: string;
  activeType: ArticleType;
  onTypeChange: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: PropsWithChildren<ArticleTypeTabsProps>) => {
  const { className, activeType, onTypeChange } = props;
  const { t } = useTranslation("article");

  const handleTypeChange = useCallback((tab: TabItem<ArticleType>) => {
    onTypeChange(tab.value);
  }, [onTypeChange]);

  const typeTabs = useMemo<Array<TabItem<ArticleType>>>(() => [
    {
      value: ArticleType.ALL,
      content: t("Все статьи"),
    },
    {
      value: ArticleType.IT,
      content: t("Айти"),
    },
    {
      value: ArticleType.SCIENCE,
      content: t("Наука"),
    },
    {
      value: ArticleType.ECONOMICS,
      content: t("Экономика"),
    },
  ], [t]);

  return (
    <Tabs
      className={classNames("", {}, [className])}
      tabs={typeTabs}
      value={activeType}
      onTabClick={handleTypeChange}
    />
  );
});
