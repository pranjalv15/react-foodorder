import React from "react";
import StripeCheckout from "react-stripe-checkout";
import UserProgressContext from "../store/UserProgressContext";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import axios from "axios";

export default function Payment({ amount }) {
  const { hideCart } = useContext(UserProgressContext);
  const { clearCart, user, items } = useContext(CartContext);
  function handleFinish() {
    hideCart();
    clearCart();
  }
  async function handleToken(token) {
    console.log(token);
    try {
      const response = await axios.post("http://localhost:3000/placeorder", {
        token,
        amount,
        user,
        items,
      });
    } catch (error) {
      window.location.href = "/";
    }
  }
  return (
    <StripeCheckout
      amount={amount}
      token={handleToken}
      stripeKey="pk_test_51OoqisSFhy76iYCdpa3OXrbYVAxhCIvDbBZvfXkZFXIHk6NhIM5yxect3bNMyBh0Qy6BifFye7kbj6TiVdcQ3hlj00s32sqvk6"
      currency="INR"
      shippingAddress
    >
      <button className="button" onClick={handleFinish}>
        Pay Now
      </button>
    </StripeCheckout>
  );
}
