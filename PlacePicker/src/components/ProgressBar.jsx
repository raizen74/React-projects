import { useEffect, useState } from "react";

export default function ProgressBar({ time }) {
  const [timeout, refreshTimeout] = useState(time);
  useEffect(() => {
    const timer = setInterval(() => {
      refreshTimeout((prevState) => prevState - 10); // onConfirm prop is a function
    }, 10); // function is executed after 3000 ms

    // cleanup function: executes BEFORE SUBSEQUENT executions of useEffect OR
    // right before the component DeleteConfirmation dismounts (is removed from the DOM)
    return () => {
      clearInterval(timer); // stops the timer whenever the component is removed
    };
  }, []); // if onConfirm changes -> useEffect reexecutes
  return <progress value={timeout} max={time} />;
}
