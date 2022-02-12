import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  // -- useState --
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // -- useNavigate --
  const navigate = useNavigate();

  // -- Axios LogIn Form POST --
  const handleLogin = (e) => {
    e.preventDefault();

    const data = { email, password };
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, data, {
        withCredentials: true,
      })
      .then(() => navigate("/all-users"))
      .catch((err) => setError(err.response.data));
  };

  // -- JSX --
  return (
    <div>
      <form action="" onSubmit={handleLogin}>
        {error !== "" ? <div>{error}</div> : null}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default LoginForm;
