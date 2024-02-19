import Modal from "../UI/Modal";
import { currencyformatter } from "../util/formatting";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
export default function Checkout() {
  const { items } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  let totalAmount = 0;
  for (let i = 0; i < items.length; i++) {
    totalAmount += items[i].price * items[i].quantity;
  }

  function handleCloseCheckout() {
    hideCheckout();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    await fetch("http://localhost:3000/orders", {
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

        <p className="modal-actions">
          <button className="text-button" onClick={handleCloseCheckout}>
            Close
          </button>
          <button className="button">Submit Order</button>
        </p>
      </form>
    </Modal>
  );
}
