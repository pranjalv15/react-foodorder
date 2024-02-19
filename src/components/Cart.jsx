import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import { currencyformatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);
  let totalPrice = 0;
  for (let i = 0; i < items.length; i++) {
    totalPrice += items[i].quantity * items[i].price;
  }

  function handleAdd(item) {
    addItem(item);
  }
  function handleRemove(id) {
    removeItem(id);
  }

  function handleCloseCart() {
    hideCart();
  }
  function handleShowCheckout() {
    showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => {
          return (
            <li className="cart-item" key={item.id}>
              <p>
                {item.name} - {item.quantity} &#215;{" "}
                {currencyformatter.format(item.price)}
              </p>
              <p className="cart-item-actions">
                <button onClick={() => handleRemove(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleAdd(item)}>+</button>
              </p>
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{currencyformatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <button className="text-button" onClick={handleCloseCart}>
          Close
        </button>
        {items.length > 0 && (
          <button className="button" onClick={handleShowCheckout}>
            Go to Checkout
          </button>
        )}
      </p>
    </Modal>
  );
}
