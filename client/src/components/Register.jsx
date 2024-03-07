import axios from "axios";
import { useState } from "react";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [error, seterror] = useState();
  const [showRegistered, setShowRegistered] = useState(false);
  const [alreadyRegistered, setalredyRegistered] = useState(false);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePassChange(event) {
    setPassword(event.target.value);
  }
  function handleConfirmPassChange(event) {
    setConfirmPass(event.target.value);
  }

  async function handleRegistration(event) {
    event.preventDefault();
    if (password !== confirmPass) {
      alert("Password not Matched!!");
    } else {
      setIsFetching(true);
      try {
        const user = {
          name,
          email,
          password,
        };
        const response = await axios.post(
          "http://localhost:3000/register",
          user
        );

        if (response.status === 200) {
          setalredyRegistered(true);
        } else if (response.status !== 201) {
          throw new Error("Failed to Register");
        } else {
          setShowRegistered(true);
        }
      } catch (error) {
        seterror({ message: error.message });
      }
      setIsFetching(false);
    }
  }
  if (alreadyRegistered) {
    return (
      <div className=" register">
        <div className="register-header">
          <h2>Email already in use</h2>
          <p>Please Login!</p>
        </div>
        <a href="/login">
          <button className="button lobt">Login</button>
        </a>
      </div>
    );
  } else if (showRegistered && !error) {
    return (
      <div className=" register">
        <div className="register-header">
          <h2>User Registered Successfully!</h2>
          <p>Please Login!</p>
        </div>
        <a href="/login">
          <button className="button lobt">Login</button>
        </a>
      </div>
    );
  }
  return (
    <div className="register">
      <div className="register-header">
        <h2>Registration Form</h2>
      </div>

      <form class="registration-form" onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePassChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPass}
          onChange={handleConfirmPassChange}
        />
        {isFetching ? (
          <p>Registering the user</p>
        ) : (
          <button className="button register-button">REGISTER</button>
        )}
      </form>
      <a href="/login" className="at ">
        <p className="register-text att">Click here to Login</p>
      </a>
    </div>
  );
}

export default Register;
