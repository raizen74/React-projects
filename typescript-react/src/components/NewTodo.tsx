import React, { useRef, useContext } from "react";
import { TodosContext } from "../store/todos-context"; // import the context
import classes from "./NewTodo.module.css";

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext); // useContext is a hook that allows you to subscribe to React context without introducing nesting
  
  // explicitly declare the generic type of the useRef hook
  // starting value is null, eventually will be an Input element
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // todoTextInputRef.current?.value -> try to get the current value and if it is null, return undefined
    // todoTextInputRef.current!.value -> non-null assertion operator this tells TypeScript that you are sure that the value is not null
    // but be careful, if it is null, it will throw an error
    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }
    
    todosCtx.addTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor='text'>Todo text</label>
      <input type='text' id='text' ref={todoTextInputRef} />
      <button type='submit'>Add Todo</button>
    </form>
  );
};

export default NewTodo;
