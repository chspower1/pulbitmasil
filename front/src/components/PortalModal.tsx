import { createPortal } from "react-dom";
import ReactDOM from "react-dom/client";

const Modal = ({ children }: { children: any }) => <div className="Modal">{children}</div>;

const PortalModal = (props: any) => {
  const modalRoot = document.querySelector("#modal");

  return createPortal(<Modal {...props} />, modalRoot!);
};
export default PortalModal;
