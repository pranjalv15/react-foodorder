import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import CartContext from "../store/CartContext";
export default function Orders() {
  const { user } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.post("http://localhost:3000/orders", user);
        const resData = await response.data;
        console.log(resData);
        setOrders(resData);
        if (response.status !== 200) {
          throw new Error("failed to fetch places");
        }
      } catch (error) {}
    }
    fetchOrders();
  }, []);
  return (
    <div className="register">
      <div className="register-header">
        <h2>Your Orders</h2>
      </div>
      <div>
        {orders.length > 0 &&
          orders.map((order) => {
            return (
              <div className="order">
                <h3>items :</h3>
                {order.items.map((item) => {
                  return (
                    <p>
                      {item.name} * {item.quantity}
                    </p>
                  );
                })}
                <p>Price: {order.amount}</p>
                <p>Date:{order.createdAt}</p>
              </div>
            );
          })}
      </div>
      <a href="/">
        <button className="button order-button">Home Page</button>
      </a>
    </div>
  );
}
