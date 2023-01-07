import { memo, PropsWithChildren } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./ArticlesSearch.module.scss";
import { useTranslation } from "react-i18next";
import { Input } from "@/shared/ui/Input";
import { Card } from "@/shared/ui/Card";
import { HStack } from "@/shared/ui/Stack";

interface ArticlesSearchProps {
  className?: string;
  searchText: string;
  onSearchChange: (search: string) => void;
}

export const ArticlesSearch = memo((props: PropsWithChildren<ArticlesSearchProps>) => {
  const { className, searchText, onSearchChange } = props;
  const { t } = useTranslation();

  return (
    <HStack max className={classNames(styles.ArticlesSearch, {}, [className])}>
      <Card className={styles.search}>
        <Input placeholder={t("Поиск")} value={searchText} onChange={onSearchChange} />
      </Card>
    </HStack>
  );
});
