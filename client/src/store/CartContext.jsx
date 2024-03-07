import { createContext, useState } from "react";

const CartContext = createContext({
  user: {},
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export function CartContextProvider({ children }) {
  const cartitems = localStorage.getItem("cartitems")
    ? JSON.parse(localStorage.getItem("cartitems"))
    : [];

  const iniuser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [cart, setCart] = useState({ items: cartitems, user: iniuser });

  function addItem(item) {
    setCart((prev) => {
      const cartItemIndex = prev.items.findIndex((it) => {
        return it.id === item.id;
      });
      const updatedItems = [...prev.items];
      if (cartItemIndex > -1) {
        const existingitem = prev.items[cartItemIndex];
        const updatedItem = {
          ...existingitem,
          quantity: existingitem.quantity + 1,
        };
        updatedItems[cartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("cartitems", JSON.stringify(updatedItems));
      return { ...prev, items: updatedItems };
    });
  }

  function removeItem(id) {
    setCart((prev) => {
      const cartItemIndex = prev.items.findIndex((it) => {
        return it.id === id;
      });
      const cartItem = prev.items[cartItemIndex];
      const updatedItems = [...prev.items];
      if (cartItem.quantity === 1) {
        updatedItems.splice(cartItemIndex, 1);
      } else {
        const updatedItem = {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        };
        updatedItems[cartItemIndex] = updatedItem;
      }
      localStorage.setItem("cartitems", JSON.stringify(updatedItems));
      return { ...prev, items: updatedItems };
    });
  }

  function clearCart() {
    setCart((prev) => {
      return { ...prev, items: [] };
    });
    localStorage.removeItem("cartitems");
  }

  function logginUser(us) {
    setCart((prev) => {
      localStorage.setItem("user", JSON.stringify(us));
      return { ...prev, user: us };
    });
  }

  function logout() {
    setCart((prev) => {
      localStorage.removeItem("user");
      localStorage.removeItem("cartitems");
      return { ...prev, items: [], user: null };
    });
  }

  const cartContext = {
    user: cart.user,
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
    logginUser: logginUser,
    logout: logout,
  };

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
