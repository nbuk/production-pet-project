import { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { Currency } from "../../model/types/currency";
import { Listbox } from "@/shared/ui/Popups/ui/Listbox";
import { ListboxItem } from "@/shared/ui/Popups/ui/Listbox/Listbox";

const options: Array<ListboxItem<Currency>> = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

interface CurrencySelectProps {
  className?: string;
  value: Currency;
  readonly?: boolean;
  onChange: (value: Currency) => void;
}

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const {
    className,
    readonly,
    value,
    onChange,
  } = props;

  const { t } = useTranslation();

  const handleChange = useCallback((value: string) => {
    onChange(value as Currency);
  }, [onChange]);

  return (
    <Listbox
      className={classNames("", {}, [className])}
      readonly={readonly}
      label={t("Укажите валюту")}
      value={value}
      defaultValue={t("Укажите валюту")}
      items={options}
      onChange={handleChange}
    />
  );
});
