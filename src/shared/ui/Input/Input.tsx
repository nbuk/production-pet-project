import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./Input.module.scss";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  autofocus?: boolean;
  onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    autofocus,
    type = "text",
    placeholder,
    onChange,
    ...otherProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  return (
    <div className={classNames(styles.inputWrapper, {}, [className])}>
      {placeholder && (
        <div className={styles.placeholder}>
          {`${placeholder} >`}
        </div>
      )}
      <div className={styles.caretWrapper}>
        <input
          ref={ref}
          data-testid={"input"}
          className={styles.Input}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSelect={handleSelect}
          {...otherProps}
        />
        {isFocused && <span data-testid={"input-caret"} className={styles.caret} style={{ left: `${caretPosition * 9}px` }} />}
      </div>
    </div>
  );
});
