## React FoodOrder project

- Send HTTP requests to the `./backend` in `Meals.jsx (GET) ` and `Checkout.jsx (POST)`
- Delegating HTTP requests to a custom hook `./hooks/useHttp.js` which uses `useEffect` and `useCallback` hooks. `useCallback` is used to memoize functions until a dependency changes (the function is the same object when the component rerenders)
- `useContext` to manage **cart data** in a centralized way, avoiding **prop drilling** -> `src/store/CartContext.jsx`
- `useReducer` to manage Cart state in `src/store/CartContext.jsx`, cart state is used in `MealItem.jsx`, `Header.jsx` and `Cart.jsx`
- React `Portal` used in the `Modal.jsx` to inject the component in the html element with `id=modal`. `Cart.jsx` and `Checkout.jsx` are modals.
- Manage `UserProgressContext.jsx` to manage which modal has to be rendered.

**Form submission**
- We could set an `onSubmit prop` that triggers a custom function when the form is submitted (APPROACH BROWSER API: form onSubmit={handleSubmit}) or use `Form Actions` (APPROACH FORM ACTIONS: form action={checkoutAction}) both are implemented in `Checkout.jsx`