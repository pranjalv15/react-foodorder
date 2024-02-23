import Modal from "../UI/Modal";
import { currencyformatter } from "../util/formatting";
import { useContext, useState } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const [error, setError] = useState();
  const [isfetching, setIsFetching] = useState(false);
  const [showOrderPlaced, setShowOrderPlaced] = useState(false);
  let totalAmount = 0;
  for (let i = 0; i < items.length; i++) {
    totalAmount += items[i].price * items[i].quantity;
  }

  function handleCloseCheckout() {
    hideCheckout();
  }

  function handleFinish() {
    hideCheckout();
    clearCart();
    setShowOrderPlaced(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    setIsFetching(true);
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: {
            items: items,
            customer: customerData,
          },
        }),
      });
      if (!response.ok) {
        throw new Error("failed to place order");
      } else {
        setShowOrderPlaced(true);
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsFetching(false);
  }

  let actions = (
    <>
      <button className="text-button" onClick={handleCloseCheckout}>
        Close
      </button>
      <button className="button">Submit Order</button>
    </>
  );

  if (isfetching) {
    actions = <span>Sending Order ... </span>;
  }

  if (showOrderPlaced && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was placed successfully</p>
        <p className="modal-actions">
          <button className="button" onClick={handleFinish}>
            Okay
          </button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
      <form className="control" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyformatter.format(totalAmount)}</p>

        <label htmlFor="name">Full Name</label>
        <input id="name" type="text" name="name" required />

        <label htmlFor="email">E-Mail Address</label>
        <input id="email" type="email" name="email" required />

        <label htmlFor="street">Street</label>
        <input id="street" type="text" name="street" required />

        <div className="control-row">
          <label htmlFor="postal-code">Postal Code</label>
          <input id="postal-code" type="text" name="postal-code" required />

          <label htmlFor="city">City</label>
          <input id="city" type="text" name="city" required />
        </div>
        {error && <p>Failed to place your order!</p>}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
