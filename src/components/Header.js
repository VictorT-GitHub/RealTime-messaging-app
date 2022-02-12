import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // -- useState --
  const [userdata, setuserdata] = useState("");
  const [error, setError] = useState("");

  // -- useNavigate --
  const navigate = useNavigate();

  // -- Axios logout user (navigate "/") GET --
  const logout = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  // -- useEffect --
  // Axios user data GET
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/one`, {
        withCredentials: true,
      })
      .then((res) => setuserdata(res.data))
      .catch((err) => setError(err.response.data));
  }, []);

  return (
    <header>
      <nav>
        <button onClick={() => navigate("/all-users")}>All Users</button>
        <button onClick={() => navigate("/myconversations")}>
          My Conversations
        </button>
        <button onClick={() => navigate("/myprofil")}>My Profil</button>

        <button onClick={() => navigate("/")}>LogIn - Register</button>
        <button onClick={logout}>LogOut</button>

        {userdata && <span> {userdata.email}</span>}
        {error && <span> {error}</span>}
      </nav>

      <hr />
    </header>
  );
};

export default Header;
