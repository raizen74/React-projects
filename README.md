## useMemo -> React Counter project

React practice project:
- `useCallback` hook: avoids recreation of a function (which would generate a new prop if passed to children components). Usually needed if you have a function as dependency of useEffect
- `memo`: Wraps a component, if its props do not change, memo prevents component reexecution (triggered by ancestor components)
- `useMemo`: React executes isPrime(initialCount) and saves the result, only reexecutes if any dependency changes (array args)
  
## Refs-Portals Timer challenge APP build with React

Working with React Refs (`useRef`)  and Portals (`createPortal`), and exposing APIs via `useImperativeHandle`.

## Context-Reducers

### CONTEXT API

1. create context component in a separate module:
```
export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = React.useState('light');
 
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === 'light' ? 'dark' : 'light';
    });
  };
 
  return (
    // { theme, toggleTheme } -> returns an object, keys are variable names theme and toggleTheme, values are variable values 'light' and f()
    <ThemeContext.Provider value={{ theme, toggleTheme }}> 
      {children}
    </ThemeContext.Provider>
  );
}
```

2. Wrap the main component
```
function App() {
  return (
    <ThemeContextProvider>
      <Page />
    </ThemeContextProvider>
  );
}
```

3. Import context in **descendant components**
```
import { ThemeContext } from './ThemeContextProvider';
const themeCtx = React.useContext(ThemeContext);
const className = themeCtx.theme
```

### REDUCERS
Check `shopping-cart-contex.jsx` comments and `App` and `Product` components

## PROJECT PLANNER

Project planner web app built with React: `npm run dev -- --host` 

## PlacePicker

React project for practicing:
- Side Effects
- `useEffect` hook and cleanup
- sync state using useEffect in `Modal.jsx`
- `useCallback` hook to avoid recursion in `useEffect` 
- `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval` JavaScript APIs
- `localStorage.getItem`, `localStorage.setItem` for local storage and `navigator.geolocation.getCurrentPosition` for geolocation browser APIs

## PlacePicker-HTTP: Place picker REACT project fetching data from a backend server

- Fetch data from a backend, `node ./backend/app.js` , `npm run dev -- --host`
- GET and PUT HTTP requests with `fetch` JS function in `http.js` file
- Error handling in the async network requests

## PlacePicker-customHooks: Place picker REACT project fetching data from a backend server

- Fetch data from a backend, `node ./backend/app.js` , `npm run dev -- --host`
- GET and PUT HTTP requests with `fetch` JS function in `http.js` file
- Error handling in the async network requests
- Use custom Hook to reuse functionality `hooks/useFetch.js` 