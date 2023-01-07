import { FC, PropsWithChildren, Suspense } from "react";
import { classNames } from "@/shared/lib/classNames";
import { Modal } from "@/shared/ui/Modal/Modal";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import { Loader } from "@/shared/ui/Loader/Loader";

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
      className={classNames("", {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy={lazy}
    >
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
