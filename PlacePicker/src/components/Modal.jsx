import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ open, children, onClose }) {
  // props and state are dependencies since reexecute the component
  const dialog = useRef(); // initially this ref is undefined
  
  // useEffect is executed right AFTER the component function returns, the connexion between the ref and the dialog is already established
  useEffect(() => {
    if (open) {
      dialog.current.showModal(); // triggers ::backdrop
    } else {
      dialog.current.close();
    }
  }, [open]); // [open] -> everytime open changes useEffect function reexecutes

  // onClose listens for pressing ESC
  return createPortal(
    <dialog className='modal' ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
