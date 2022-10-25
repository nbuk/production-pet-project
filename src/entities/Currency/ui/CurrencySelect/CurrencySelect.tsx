import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { Select } from "shared/ui/Select/Select";
import { Currency } from "../../model/types/currency";

const options = [
  { value: Currency.RUB, label: Currency.RUB },
  { value: Currency.EUR, label: Currency.EUR },
  { value: Currency.USD, label: Currency.USD },
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
    <Select
      className={classNames("", {}, [className])}
      readonly={readonly}
      label={t("Укажите валюту")}
      value={value}
      options={options}
      onChange={handleChange}
    />
  );
});
