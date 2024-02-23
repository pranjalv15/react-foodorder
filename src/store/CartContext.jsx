import { createContext, useState } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });

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
      return { ...prev, items: updatedItems };
    });
  }

  function clearCart() {
    setCart((prev) => {
      return { ...prev, items: [] };
    });
  }

  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
  };

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
