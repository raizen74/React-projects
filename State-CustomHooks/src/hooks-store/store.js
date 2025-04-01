import { useState, useEffect } from "react";

// created once at file import
let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1]; // binded to the function

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    // propagate state update to all listeners
    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState); // register a listener for the component
    }
    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState); // remove the listener when the component unmounts
      }
    };
  }, [setState, shouldListen]); // useEffect will only run once for the component that uses this useStore custom hook.
  // react guarantees that setState never changes for a component, so it should be a dependency.

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
