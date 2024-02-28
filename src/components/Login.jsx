import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import CartContext from "../store/CartContext";

function Login() {
  const { user, logginUser } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, seterror] = useState();

  useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, [user]);

  function handleEmailChange(event) {
    setEmail(event.target.value);
    seterror(null);
  }
  function handlePassChange(event) {
    setPassword(event.target.value);
    seterror(null);
  }
  async function handleLogin(event) {
    event.preventDefault();
    setIsFetching(true);
    try {
      const user = { email, password };
      const response = await axios.post("http://localhost:3000/login", user);
      const resData = await response.data;
      console.log(response.status);
      if (response.status !== 201) {
        throw new Error("Failed to Login");
      } else {
        seterror(null);
        logginUser(resData);
        window.location.href = "/";
      }
    } catch (error) {
      seterror({ message: error.message });
    }
    setIsFetching(false);
  }

  return (
    <div className="register">
      <div className="register-header">
        <h2>Login</h2>
      </div>

      <form className="registration-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Name"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassChange}
        />
        {error && (
          <p className="alert">Please Enter correct email and password</p>
        )}

        {isFetching ? (
          <p>Logging...</p>
        ) : (
          <button className="button register-button">Login</button>
        )}
      </form>
      <a href="/register" className="at ">
        <p className="register-text att">Click here to register</p>
      </a>
    </div>
  );
}

export default Login;
