// useCallback hook: avoids recreation of a function (which would generate a new prop if passed
// to children components). Needed if you have a function as dependency of useEffect

// memo: if props do not change (initialCount), memo prevents component reexecution

import { memo, useState, useCallback, useMemo } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";
import { use } from "react";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// if the props do not change (initialCount), memo prevents component reexecution
const Counter = memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  // useMemo: React executes isPrime(initialCount) and saves the result, only reexecutes if any dependency changes (array args)
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]); // use memo receives a function

  const [counter, setCounter] = useState(initialCount);
  
  // useCallback hook avoids recreation of a function (which would generate a new propt if passed
  // as propt to children components). Needed if you have a function as dependency of useEffect
  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }, []); // second arg: array of dependencies, if any one changes the Callback is triggered

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return (
    <section className='counter'>
      <p className='counter-info'>
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});

export default Counter;
