import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ setLoginState, setRegisterState }) => {
  // -- useState --
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [motto, setMotto] = useState("");

  // -- Axios Register Form POST --
  const handleRegister = async (e) => {
    e.preventDefault();

    // Data manipulation
    // (motto & birthday are allowed not to be sent to backend, but cannot be sent as empty string (""))
    const dirtyData = { email, password, firstname, lastname, birthday, motto };
    const cleanData = {};
    for (const key in dirtyData) {
      if (dirtyData[key].trim().length > 0) cleanData[key] = dirtyData[key];
    }

    // Login POST request
    await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, cleanData, {
        withCredentials: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => setError(err.response.data));

    // Reset inputs values
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setBirthday("");
    setMotto("");

    // Reset errors display
    setError("");

    // Close register component & Open login component
    setLoginState(true);
    setRegisterState(false);
  };

  // -- JSX --
  return (
    <div>
      <form action="" onSubmit={handleRegister}>
        {error !== "" ? <div>{error}</div> : null}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <input
          type="text"
          placeholder="Firstname"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
        />
        <input
          type="text"
          placeholder="Lastname"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
        />
        <br />
        <input
          type="date"
          placeholder="Birthday"
          onChange={(e) => setBirthday(e.target.value)}
          value={birthday}
        />
        <input
          type="text"
          placeholder="Motto"
          onChange={(e) => setMotto(e.target.value)}
          value={motto}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;
