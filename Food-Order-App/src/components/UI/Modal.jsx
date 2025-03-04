import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
// className prop has a default value to avoid undefined value
export default function Modal({ children, open, className = '', onClose }) {

  const dialog = useRef();
  
  useEffect(() => {  // triggered after the component renders
    const modal = dialog.current;  // reference to the dialog element
    if (open) {
      modal.showModal(); // open the modal programmaticaly
    }

    return () => modal.close();// cleanup function, runs before useEffect reexecutes (after open changes)
  }, [open]);
  // <dialog open ->
  return createPortal(
    // onClose listens for close events emmited by the browser e.g. pressing ESC key
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>{children}</dialog>,
    document.getElementById("modal")  // render the dialog element in the div with id="modal"
  );
}
