import { useContext, useActionState } from "react";
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  // body:
}; // the object is created once, if it were created inside the Meals component
// it would be recreate every time and triggered useHttp infinite loop

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    // isLoading: isSending,  //form pending state is not needed with the Form Actions aproach
    error,
    sendRequest,
    clearData,
  } = useHttp("http://172.30.210.50:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * parseFloat(item.price);
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout(); // sets userProgress to ''
  }
  function handleFinish() {
    userProgressCtx.hideCheckout(); // sets userProgress to ''
    cartCtx.clearCart();
    clearData(); // clear data provided by the customHook
  }
  //APPROACH BROWSER API: form onSubmit={handleSubmit}
  function handleSubmit(event) {
    event.preventDefault();
    // get the form data with FormData browser API
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        // format to backend expected format
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }
  //APPROACH FORM ACTIONS: form action={checkoutAction}
  async function checkoutAction(prevState, formData) {
    const customerData = Object.fromEntries(formData.entries());

    await sendRequest(
      JSON.stringify({
        // format to backend expected format
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }
  // used with Form actions
  const [formState, formAction, isSending] = useActionState(checkoutAction, null); // initial form state
  // REPLACED BY useHttp custom hook
  // fetch(`http://172.30.210.50:3000/orders`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     // format to backend expected format
  //     order: {
  //       items: cartCtx.items,
  //       customer: customerData,
  //     },
  //   }),
  // });
  // handleClose();

  let actions = (
    <>
      {/* type="button" makes the button not submit the form (default behavior) */}
      <Button type='button' textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data!</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    // only displayed when userProgress is 'checkout'
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label='Full Name' type='text' id='name' />
        <Input label='E-Mail Address' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>

        {error && <Error title='Failed to submit order' message={error} />}

        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}
