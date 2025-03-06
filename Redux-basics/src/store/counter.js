import { createSlice } from "@reduxjs/toolkit"; // Redux Toolkit

// initial state must be passed
const initialCounterState = { counter: 0, showCounter: true };

// Redux Toolkit implementation, nicer syntax
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++; // with Redux Toolkit we can directly manipulate state, Redux takes care of clone it
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions

export default counterSlice.reducer