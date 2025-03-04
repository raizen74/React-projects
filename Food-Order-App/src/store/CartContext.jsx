import { createContext, useReducer } from "react";

// default values are optional, but they can be useful for auto-completion in IDEs
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); // findIndex returns -1 if the item is not found

    const updatedItems = [...state.items]; // create a copy of the array to not modify the original state

    if (existingCartItemIndex > -1) {
      // item already exists in the cart
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem, // destructure the existing item
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; // update the existing item in the cart
    } else {
      // the new cart item is not in the cart yet, set its quantity to 1
      updatedItems.push({ ...action.item, quantity: 1 }); // add the new item to the cart
    }

    return { ...state, items: updatedItems }; // return a new state object
  }
  if (action.type === "REMOVE_ITEM") {
    console.log(action);
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); // findIndex returns -1 if the item is not found

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      // if there is only 1 item in the cart, the item is removed
      updatedItems.splice(existingCartItemIndex, 1); // remove 1 item at the index
    } else {
      // there is more than 1 item in the cart
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; // update the existing item in the cart
    }
    return { ...state, items: updatedItems }; // return a new state object
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] }; // return a new state object without items
  }

  return state;
}

// wrappable component that provides the context to its children
// and manages the cart state
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  }); // Reducer function and initial state

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item }); // dispatchCartAction triggers the reducer function
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id }); // in the REMOVE_ITEM branch of the reducer, I expect an id
  }
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items, // whenever the cart changes, cartContext will be updated and distributed to all interested components
    addItem,
    removeItem,
    clearCart,
  };

  console.log(cartContext);

  // CartContext.Provider for React < 19
  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;
