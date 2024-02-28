import logo from "../assets/logo2.png";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext";
function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].quantity;
  }

  function handleClick() {
    showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>FOOD APP</h1>
      </div>
      <nav>
        <button className="text-button login-button">
          Login
        </button>
        <button className="text-button" onClick={handleClick}>
          Cart ({total})
        </button>
      </nav>
    </header>
  );
}

export default Header;
