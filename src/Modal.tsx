import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = (children: JSX.Element | JSX.Element[]) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    //clean up
    //this gets retured when modal gets destroyed
    //prevent memory leaks
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
