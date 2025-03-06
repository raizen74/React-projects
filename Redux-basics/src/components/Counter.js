import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter";
import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useDispatch();
  // useSelector allows us to select the piece of the state used in this component
  // So we can manage just that piece of state
  // We receive the updated counter whenever the data changes in the Redux store
  const counter = useSelector((state) => state.counter.counter);  // access the store, reducer, initial state
  const show = useSelector((state) => state.counter.showCounter); // extract that piece of state

  const incrementHandler = () => {
    // dispatch an action
    // dispatch({ type: "increment" }); // action object
    dispatch(counterActions.increment()); // action object
  };

  const increaseHandler = () => {
    // dispatch({ type: "increase", amount: 5 });
    // dispatch extra data as params
    dispatch(counterActions.increase(10)); // { type: SOME_UNIQUE_IDENTIFIER, payload: 10}
  };

  const decrementHandler = () => {
    // dispatch({ type: "decrement" });
    dispatch(counterActions.decrement()); // action object
  };

  const toggleCounterHandler = () => {
    // dispatch({ type: "toggle" });
    dispatch(counterActions.toggleCounter()); // action object
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
