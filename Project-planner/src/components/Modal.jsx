import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef() 
  
  useImperativeHandle(ref, () => {
    return { // return an object that exposes the functions you want
      open() { // expose method open to the ascendant component
        dialog.current.showModal();
      }
    }
  });
  // bind dialog ref to <dialog></dialog>
  // creating a form with method "dialog" will allow to hide the dialog
  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button >{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root"))
});

export default Modal;