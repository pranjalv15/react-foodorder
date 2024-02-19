import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal({ children, open, onClose, className = "" }) {
  const dia = useRef();
  useEffect(() => {
    if (open) {
      dia.current.showModal();
    }
    return () => dia.current.close();
  }, [open]);
  return createPortal(
    <dialog ref={dia} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
