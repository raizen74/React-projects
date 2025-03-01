// hooks must start with use

import { useState } from "react";

export default function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  // triggered on every keystroke
  function handleInputChange(event) {
    setEnteredValue(event.target.value);

    setDidEdit(false);
  }

  // fires when an input element loses focus
  function handleInputBlur() {
    setDidEdit(true);
  }

  // expose state and functions
  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid // didEdit -> we manage state, and invalid value
  };
}
