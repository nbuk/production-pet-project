import { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { Country } from "../../model/types/country";
import { Listbox } from "shared/ui/Popups/ui/Listbox";
import { ListboxItem } from "shared/ui/Popups/ui/Listbox/Listbox";

const options: Array<ListboxItem<Country>> = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
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
    <Listbox
      className={classNames("", {}, [className])}
      readonly={readonly}
      label={t("Укажите страну")}
      value={value}
      items={options}
      onChange={handleChange}
    />
  );
});
