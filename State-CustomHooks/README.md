## Replacing Redux with Context API
- Context API (`./src/context/products-context.js`) is great when you have **low-frequency** state updates, because all children rerender. Not meant to be for all your state management. It's great for authentication.
- Replace this Context API with a custom hook to manage global state -> `./src/hooks-store/store.js`