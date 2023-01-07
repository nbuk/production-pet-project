import { memo, PropsWithChildren, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./Code.module.scss";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import CopyIcon from "@/shared/assets/icons/copy.svg";

interface CodeProps {
  className?: string;
  codeText: string;
}

export const Code = memo((props: PropsWithChildren<CodeProps>) => {
  const { className, codeText } = props;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeText);
  }, [codeText]);

  return (
    <pre className={classNames(styles.Code, {}, [className])}>
      <Button className={styles.copyBtn} theme={ButtonTheme.CLEAR} onClick={handleCopy}>
          <CopyIcon className={styles.copyIcon} />
      </Button>
      <code>
        {codeText}
      </code>
    </pre>
  );
});
