import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({ // this is the default value of the context, used only by components NOT wrapped by <CartContext></CartContext>
  items: [],  // better autocompletion
  addItemToCart: () => { }, // an empty function for autocompletion purposes
  updateItemQuantity: () => { }, // an empty function for autocompletion purposes
}); // CartContext must start in Uppercase, because it contains a component

function shoppingCartReducer(state, action) { // defined outside the component function because this function must not be recreated when the component reexecutes
  // action is the argument passed to shoppingCartDispatch
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items]; // {items: []} -> initial state, defined in useReducer
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload // access id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }
    return {
      ...state,  // add previous state, not required here because there is only the item key
      items: updatedItems,
    };
  }
  
  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
}

export default function CartContextProvider({ children }) {
  // shoppingCartState -> Application state
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer, // shoppingCartReducer will be execute whenever you dispatch (shoppingCartDispatch is executed)
    {
      items: [], // initial state
    });

  // const [shoppingCart, setShoppingCart] = useState({
  //   items: [],
  // });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: id,
    });
    // setShoppingCart((prevShoppingCart) => {  // update state based on previous state
    // });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        productId, // if the property name is the same as variable name that contains the value that should be stored
        // under that property, you can use this JS shortcut
        amount
      },
    });
    // setShoppingCart((prevShoppingCart) => {
    // });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart, // exposing this function through context
    updateItemQuantity: handleUpdateCartItemQuantity
  };

  return <CartContext.Provider value={ctxValue}>
    {children}
  </CartContext.Provider>
}