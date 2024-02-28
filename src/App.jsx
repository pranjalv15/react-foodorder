import Header from "./components/Header";
import AvailableMeals from "./components/AvailableMeals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Link, Switch } from "react-router-dom";
import Orders from "./components/Orders";
function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Cart />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AvailableMeals />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
