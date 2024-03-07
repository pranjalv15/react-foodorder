import logo from "../assets/logo2.png";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext";
function Header() {
  const { items, user, logout } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].quantity;
  }

  function handleClick() {
    showCart();
  }

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }
  return (
    <header id="main-header">
      <a href="/" className="at">
        <div id="title">
          <img src={logo} alt="logo" />
          <h1>FOOD APP</h1>
        </div>
      </a>

      <nav>
        {user ? (
          <div class="dropdown">
            <h2 class="dropbtn">Hi {user.name}!</h2>

            <div class="dropdown-content">
              <a href="/orders">Orders</a>
              <a href="/" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>
        ) : (
          <a href="/login">
            <button className="text-button login-button">Login</button>
          </a>
        )}

        <button className="text-button" onClick={handleClick}>
          Cart ({total})
        </button>
      </nav>
    </header>
  );
}

export default Header;
