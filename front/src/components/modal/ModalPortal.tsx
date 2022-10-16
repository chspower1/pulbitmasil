import { createPortal } from "react-dom";

const Modal = ({ children }: { children: React.ReactElement }) => <div className="Modal">{children}</div>;
interface ModalPortalProps {
  children: React.ReactElement;
}

export default function ModalPortal(props: ModalPortalProps) {
  const modalRoot = document.querySelector("#modal");

  return createPortal(<Modal {...props} />, modalRoot!);
}
