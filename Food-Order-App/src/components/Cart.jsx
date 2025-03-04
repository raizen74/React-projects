import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../utils/formatting";
import CartItem from "./CartItem";
import Button from "./UI/Button";
import Modal from "./UI/Modal";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * parseFloat(item.price);
  }, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart(); // sets userProgress to ''
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout(); // sets userProgress to 'checkout'
  }

  return (
    // check if the userProgress is 'cart' to show the modal, if userProgress is 'checkout' the modal will not show
    <Modal
      className='cart'
      open={userProgressCtx.progress === "cart"}
      // only set onClose if the userProgress is 'cart'
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
