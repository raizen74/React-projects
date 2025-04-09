import React, { useState } from "react";
import Todo from "../models/todo";

type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void; // type function definition
  removeTodo: (id: string) => void;
}

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {}, // concrete function definition
  removeTodo: (id: string) => {},
});

// types of the props that the provider will receive
const TodoContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]); // initially empty array, eventually will be an array of Todo objects

  // onAddTodo function shape is defined in NewTodo component, where you declare the received prop types
  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo); // concat returns a new array
    });
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      // filter returns a new array with all elements that pass the test implemented by the provided function
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };
  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
}

export default TodoContextProvider;