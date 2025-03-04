import { useContext } from "react";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext); // import the context
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce(  //JS array method
    (acc, item) => acc + item.quantity,  // all the quantity property of all items in the array
    0 // initial value for the accumulator
  );

function handleShowCart() {
  userProgressCtx.showCart();  // sets userProgress to 'cart'
}

  return (
    <header id='main-header'>
      <div id='title'>
        <img src='logo.jpg' alt='A restaurant' />
        <h1>ReactFood</h1>
      </div>
      <nav>
        {/* setting just textOnly defaults to true */}
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
