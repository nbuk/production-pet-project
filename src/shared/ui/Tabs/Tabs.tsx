import { memo, ReactNode, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./Tabs.module.scss";
import { Card, CardTheme } from "shared/ui/Card";
import { HStack } from "shared/ui/Stack";

export interface TabItem<T extends string> {
  value: T;
  content: ReactNode;
}

interface TabsProps<T extends string> {
  className?: string;
  tabs: Array<TabItem<T>>;
  value: string;
  onTabClick: (tab: TabItem<T>) => void;
}

const TabsComponent = <T extends string>(props: TabsProps<T>) => {
  const {
    className,
    tabs,
    value,
    onTabClick,
  } = props;

  const handleClick = useCallback((tab: TabItem<T>) => () => {
    onTabClick(tab);
  }, [onTabClick]);

  return (
    <HStack gap={8} className={classNames(styles.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          className={styles.tab}
          theme={value === tab.value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          onClick={handleClick(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </HStack>
  );
};

export const Tabs = memo(TabsComponent) as typeof TabsComponent;
