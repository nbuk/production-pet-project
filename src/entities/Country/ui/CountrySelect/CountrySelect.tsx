import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { Select } from "shared/ui/Select/Select";
import { Country } from "../../model/types/country";

const options = [
  { value: Country.Russia, label: Country.Russia },
  { value: Country.Ukraine, label: Country.Ukraine },
  { value: Country.Belarus, label: Country.Belarus },
  { value: Country.Armenia, label: Country.Armenia },
  { value: Country.Kazakhstan, label: Country.Kazakhstan },
];

interface CountrySelectProps {
  className?: string;
  value: Country;
  readonly?: boolean;
  onChange: (value: Country) => void;
}

export const CountrySelect = memo((props: CountrySelectProps) => {
  const {
    className,
    readonly,
    value,
    onChange,
  } = props;

  const { t } = useTranslation();

  const handleChange = useCallback((value: string) => {
    onChange(value as Country);
  }, [onChange]);

  return (
    <Select
      className={classNames("", {}, [className])}
      readonly={readonly}
      label={t("Укажите страну")}
      value={value}
      options={options}
      onChange={handleChange}
    />
  );
});
