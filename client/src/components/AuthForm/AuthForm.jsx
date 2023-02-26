import React, { useState, useContext } from "react";
import Styles from "./authForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AuthForm({ signup = false }) {
  const [username, setUsername] = useState("");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const { dispatch, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signup) {
      try {
        await axios.post("/users", {
          username,
          email,
          password,
        });
        navigate("/login");
        dispatch({ type: "ACCOUNT_CREATED" });
        setTimeout(() => {
          dispatch({ type: "CLEAR_NOTIFICATION" });
        }, 5000);
      } catch (err) {
        console.log(err);
      }
      // send some sort of successfully signed up message
    } else {
      login(false, usernameOrEmail, password);
    }
  };

  return (
    <div className={Styles.authForm}>
      <form onSubmit={handleSubmit}>
        {signup ? (
          <>
            <input
              className={Styles.input}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
            />
            <input
              className={Styles.input}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            />
          </>
        ) : (
          <input
            className={Styles.input}
            type="text"
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            value={usernameOrEmail}
            placeholder="Username or email"
          />
        )}
        <input
          className={Styles.input}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        {signup && (
          <input
            className={Styles.input}
            type="password"
            onChange={(e) => setRetypePassword(e.target.value)}
            value={retypePassword}
            placeholder="Retype Password"
          />
        )}
        <button className={Styles.submitButton}>Register</button>
      </form>
    </div>
  );
}

export default AuthForm;
