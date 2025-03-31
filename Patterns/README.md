## Compound Components

- Bind Accordion subcomponents by exposing them as methods of `<Accordion>` in `Accordion.jsx`
- `useAccordionItemContext` to pass the id prop as context to children
- pass content to child components with the children prop -> `SearchableList.jsx` and `App.jsx`
- When setting the key prop in a ul component, the index of the array is not a great key because it is not directly linked to the data -> `SearchableList.jsx`
- **Debouncing** -> Pattern to not update state after each keystroke but wait a bit after the user stops typing. -> `SearchableList.jsx` `handleChange()`. Explanation: Set a timer and store it in state with a pointer, on the next keystroke check if there is a timer stored and delete it before setting the new one, so the timer resets. `searchTerm` is only updated 500 ms after the last `handleChange` execution.