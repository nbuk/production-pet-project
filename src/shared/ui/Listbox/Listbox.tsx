import { Fragment, ReactNode } from "react";
import { Listbox as HListbox } from "@headlessui/react";
import styles from "./Listbox.module.scss";
import { classNames, Mods } from "shared/lib/classNames";
import { HStack } from "shared/ui/Stack";
import { DropdownDirection } from "shared/types/ui";
import { Button } from "shared/ui/Button";

export interface ListboxItem<T> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
}

interface ListboxProps<T> {
  className?: string;
  items: Array<ListboxItem<T>>;
  value?: T;
  defaultValue?: string;
  label?: string;
  readonly?: boolean;
  direction?: DropdownDirection;
  onChange: (value: T) => void;
}

export const Listbox = <T extends string>(props: ListboxProps<T>) => {
  const {
    className,
    items,
    value,
    defaultValue,
    label,
    readonly,
    direction = "bottom-right",
    onChange,
  } = props;

  const optionsClasses = [
    styles[direction],
  ];

  return (
    <HStack gap={8}>
      {label && (
        <span className={styles.label}>
          {label + " >"}
        </span>
      )}
      <HListbox
        className={classNames(styles.Listbox, {}, [className])}
        as={"div"}
        value={value}
        disabled={readonly}
        onChange={onChange}
      >
        <HListbox.Button
          as={Button}
          disabled={readonly}
        >
            {value ?? defaultValue}
        </HListbox.Button>
        <HListbox.Options
          className={classNames(styles.options, {}, optionsClasses)}
        >
          {items.map((item) => (
            <HListbox.Option
              key={item.value}
              as={Fragment}
              value={item.value}
              disabled={item.disabled}
            >
              {({ selected, active }) => {
                const mods: Mods = {
                  [styles.active]: active,
                  [styles.selected]: selected,
                  [styles.disabled]: item.disabled,
                };

                return (
                  <li className={classNames(styles.item, mods, [])}>
                    {item.content}
                  </li>
                );
              }}
            </HListbox.Option>
          ))}
        </HListbox.Options>
      </HListbox>
    </HStack>

  );
};