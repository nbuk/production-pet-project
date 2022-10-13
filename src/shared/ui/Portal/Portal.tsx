import { FC, PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

export const Portal: FC<PropsWithChildren<PortalProps>> = (props) => {
  const { children, element = document.body } = props;

  return createPortal(children, element);
};
