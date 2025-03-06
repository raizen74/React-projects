## Redux basics Counter project

Counter built with redux
- import the Redux `store` from `/src/store/index.js` in the root `/src/index.js`, where we render the first React component. Wrap the `App` component with the `Provider` component, every child component will have access to Redux context store.
- import the `useSelector` hook in `Counter.js`, built by the redux team. Import `useDispatch` to dispatch state actions.
- Redux Toolkit implementation in `auth.js` and `counter.js` with `createSlice`
- Render the `Header` component conditionally based on state in `App.js`