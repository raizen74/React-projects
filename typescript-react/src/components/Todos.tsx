import React, { useContext } from "react";
import { TodosContext } from "../store/todos-context"; // import the context
import TodoItem from "./TodoItem";
import classes from "./Todos.module.css";
// FC is a generic type to build functional components
const Todos: React.FC = () => {

  const todosCtx = useContext(TodosContext); // useContext is a hook that allows you to subscribe to React context without introducing nesting
  return (
    <ul className={classes.todos}>
      {todosCtx.items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)} // bind creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called
        />
      ))}
    </ul>
  );
};

export default Todos;
