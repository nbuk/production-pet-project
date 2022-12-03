import { ChangeEvent, memo, useMemo } from "react";
import { classNames, Mods } from "shared/lib/classNames";
import styles from "./Select.module.scss";

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options: Array<SelectOption<T>>;
  value: T;
  readonly?: boolean;
  onChange: (value: T) => void;
}

const SelectComponent = <T extends string>(props: SelectProps<T>) => {
  const {
    className,
    label,
    options,
    value,
    readonly,
    onChange,
  } = props;

  const optionList = useMemo(() => {
    return options.map((opt) => (
      <option
        key={opt.value}
        className={styles.option}
        value={opt.value}
      >
        {opt.label}
      </option>
    ));
  }, [options]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as T);
  };

  const mods: Mods = {
    [styles.readonly]: readonly,
  };

  return (
    <div className={classNames(styles.wrapper, mods, [className])}>
      {label && (
        <span className={styles.label}>
          {label + " >"}
        </span>
      )}
      <select
        disabled={readonly}
        className={styles.select}
        value={value}
        onChange={handleChange}
      >
        {optionList}
      </select>

    </div>
  );
};

export const Select = memo(SelectComponent) as typeof SelectComponent;
