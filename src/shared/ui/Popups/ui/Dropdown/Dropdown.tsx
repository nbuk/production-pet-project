import { Menu } from "@headlessui/react";
import styles from "./Dropdown.module.scss";
import { FC, Fragment, ReactNode } from "react";
import { classNames } from "shared/lib/classNames";
import { DropdownDirection } from "shared/types/ui";
import { AppLink } from "shared/ui/AppLink";
import popupStyles from "../../styles/popup.module.scss";

export interface DropDownItem {
  disabled?: boolean;
  content: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropDownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}

export const Dropdown: FC<DropdownProps> = (props) => {
  const {
    className,
    items,
    trigger,
    direction = "bottom-right",
  } = props;

  const menuClasses = [popupStyles[direction]];

  return (
    <Menu as={"div"} className={classNames(styles.Dropdown, {}, [className, popupStyles.popup])}>
      <Menu.Button
        className={styles.trigger}
      >
        {trigger}
      </Menu.Button>
      <Menu.Items className={classNames(styles.menu, {}, menuClasses)}>
        {items.map((item, i) => {
          const content = ({ active }: { active: boolean; }) => (
            <button
              className={classNames(popupStyles.item, { [popupStyles.active]: active }, [])}
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item
                key={i}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item key={i} as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
