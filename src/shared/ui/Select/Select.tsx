import { ChangeEvent, memo, useMemo } from "react";
import { classNames, Mods } from "shared/lib/classNames";
import styles from "./Select.module.scss";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options: SelectOption[];
  value: string;
  readonly?: boolean;
  onChange: (value: string) => void;
}

export const Select = memo((props: SelectProps) => {
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
    onChange(e.target.value);
  };

  const mods: Mods = {
    [styles.readonly]: readonly,
  };

  return (
    <div className={classNames(styles.wrapper, mods, [className])}>
      {label && (
        <span className={styles.label}>
          {label + ">"}
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
});
