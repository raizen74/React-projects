## React Counter project

React practice project:
- `useCallback` hook: avoids recreation of a function (which would generate a new prop if passed to children components). Usually needed if you have a function as dependency of useEffect
- `memo`: Wraps a component, if its props do not change, memo prevents component reexecution (triggered by ancestor components)
- `useMemo`: React executes isPrime(initialCount) and saves the result, only reexecutes if any dependency changes (array args)