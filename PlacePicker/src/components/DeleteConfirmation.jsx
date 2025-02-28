import { useEffect } from "react";
import ProgressBar from "./ProgressBar";
const TIME = 3000
export default function DeleteConfirmation({ onConfirm, onCancel }) {

  // useEffect executes AFTER the component returns (renders)
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm(); // onConfirm prop is a function
    }, TIME); // function is executed after 3000 ms

    // cleanup function: executes BEFORE SUBSEQUENT executions of useEffect OR
    // right before the component DeleteConfirmation dismounts (is removed from the DOM)
    return () => {
      clearTimeout(timer); // stops the timer whenever the component is removed
    };
  }, [onConfirm]); // if onConfirm changes -> useEffect reexecutes

  return (
    <div id='delete-confirmation'>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id='confirmation-actions'>
        <button onClick={onCancel} className='button-text'>
          No
        </button>
        <button onClick={onConfirm} className='button'>
          Yes
        </button>
      </div>
      <ProgressBar time={TIME}/>
    </div>
  );
}
