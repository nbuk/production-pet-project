import { FC, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./LoginModal.module.scss";
import { Modal } from "shared/ui/Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  lazy?: boolean;
  onClose: () => void;
}

export const LoginModal: FC<PropsWithChildren<LoginModalProps>> = (props) => {
  const { className, isOpen, lazy = true, onClose } = props;
  return (
    <Modal
      className={classNames(styles.LoginModal, {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy={lazy}
    >
      <LoginForm />
    </Modal>
  );
};
