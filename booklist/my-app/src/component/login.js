import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const handleGetRequest = () => {
    console.log(email, password);
    axios
      .post("http://localhost:8081/book/login", { email: email, password: password })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token",response.data.token)
        console.log(localStorage.getItem("token"))
        navigate("/addbook");
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };
  const gotosignup = () => {
    navigate("/signup")
  };

  return (
    <>
      <div className="container">
        <div className="offer_login">
          <h1>Login</h1>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>
            <button id="signup-button" onClick={gotosignup}>
              SIGN UP
            </button>
            <button id="submit-button" onClick={handleGetRequest}>
              Submit
            </button>
          </span>
          {error && <div>Either sign up or enter correct details </div>}
        </div>
      </div>
    </>
  );
};

export default Login;
