import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter';
import authReducer from './auth';



// 1 Redux store for all Slices
const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer }, // expected property by configureStore
});

// REPLACED BY REDUX TOOLKIT createSlice
// const counterReducer = (state = initialState, action) => {
//   if (action.type === "increment") {
//     // What the Reducer returns OVERIDES state so showCounter state must be unchanged
//     // You must always return a BRAND NEW STATE OBJECT
//     return { counter: state.counter + 1, showCounter: state.showCounter };
//   }

//   if (action.type === "increase") {
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "decrement") {
//     return { counter: state.counter - 1, showCounter: state.showCounter };
//   }

//   if (action.type === "toggle") {
//     return { counter: state.counter, showCounter: !state.showCounter };
//   }

//   return state;
// };

// const store = createStore(counterReducer);

export default store;
