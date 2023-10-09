import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login('demouser@aa.io', 'password'))
    .then(closeModal);
  };

  console.log(errors)
  return (
    <div id='login-container'>
      <h1>Log In</h1>
      {errors && errors.password &&
        <p id='error-text'>{errors.password}</p>
      }
      {errors && errors.email &&
        <p id='error-text'>{errors.email}</p>
      }
      <form onSubmit={handleSubmit}>
        <div id='login-email-container'>
          <label>
            Email:
          </label>
          <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        <div id='login-password-container'>
          <label>
            Password:
          </label>
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        <div id='login-button-container'>
          <button id='login-submit-button' type="submit">Log In</button>
          <button id='login-demo-button' onClick={handleDemoLogin}>Log In Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
