import { Popover as HPopover } from "@headlessui/react";
import { FC, ReactNode } from "react";
import styles from "./Popover.module.scss";
import popupStyles from "../../styles/popup.module.scss";
import { DropdownDirection } from "shared/types/ui";
import { classNames } from "shared/lib/classNames";

interface PopoverProps {
  className?: string;
  direction?: DropdownDirection;
  trigger: ReactNode;
  children: ReactNode;
}

export const Popover: FC<PopoverProps> = (props) => {
  const {
    className,
    direction = "bottom-right",
    trigger,
    children,
  } = props;

  const popoverDirection = popupStyles[direction];

  return (
    <HPopover className={classNames(styles.Popover, {}, [className, popupStyles.popup])}>
      <HPopover.Button className={classNames(popupStyles.trigger)}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(styles.panel, {}, [className, popupStyles.popup, popoverDirection])} >
        {children}
      </HPopover.Panel>
    </HPopover>
  );
};
