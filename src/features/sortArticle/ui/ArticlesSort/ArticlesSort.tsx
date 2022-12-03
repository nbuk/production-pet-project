import { memo, PropsWithChildren, useMemo } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticlesSort.module.scss";
import { useTranslation } from "react-i18next";
import { Select, SelectOption } from "shared/ui/Select";
import { ArticleSortField } from "entities/Article/model/types/article";
import { SortOrder } from "shared/types";

interface ArticlesPageFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onSortChange: (sort: ArticleSortField) => void;
  onOrderChange: (order: SortOrder) => void;
}

export const ArticlesSort = memo((props: PropsWithChildren<ArticlesPageFiltersProps>) => {
  const {
    className,
    sort,
    order,
    onOrderChange,
    onSortChange,
  } = props;
  const { t } = useTranslation();

  const sortOptions = useMemo<Array<SelectOption<ArticleSortField>>>(() => [
    {
      value: ArticleSortField.CREATED,
      label: t("по дате создания"),
    },
    {
      value: ArticleSortField.TITLE,
      label: t("по названию"),
    },
    {
      value: ArticleSortField.VIEWS,
      label: t("по просмотрам"),
    },
  ], [t]);

  const orderOptions = useMemo<Array<SelectOption<SortOrder>>>(() => [
    {
      value: "asc",
      label: t("по возрастанию"),
    },
    {
      value: "desc",
      label: t("по убыванию"),
    },
  ], [t]);

  return (
    <div className={classNames(styles.ArticlesSort, {}, [className])}>
      <Select
        label={t("Сортировать")}
        options={sortOptions}
        value={sort}
        onChange={onSortChange}
      />
      <Select
        label={t("Порядок")}
        options={orderOptions}
        value={order}
        onChange={onOrderChange}
      />
    </div>
  );
});
