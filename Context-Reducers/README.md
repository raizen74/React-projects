## CONTEXT API

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

## REDUCERS
Check `shopping-cart-contex.jsx` comments and `App` and `Product` components