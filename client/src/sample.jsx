function handleAdd(item) {
    addItem(item);
  }
  function handleRemove(id) {
    removeItem(id);
  }

<h2>Your Cart</h2>
      <ul className="">
        {items.map((item) => {
          return (
            <li className="cart-item">
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