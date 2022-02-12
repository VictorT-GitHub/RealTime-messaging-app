import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Footer from "../components/Footer";
import Header from "../components/Header";

const ProfilPage = () => {
  // -- useState --
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [editFormState, setEditFormState] = useState(false);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [motto, setMotto] = useState("");

  // -- useNavigate --
  const navigate = useNavigate();

  // -- useEffect --
  // Axios user data GET
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/one`, {
        withCredentials: true,
      })
      .then((res) => setUserData(res.data))
      .catch((err) =>
        err.response.data ? setError(err.response.data) : console.log(err)
      );
  }, []);

  // -- Axios edit user Form PUT --
  const handleEditUser = (e) => {
    e.preventDefault();

    let dirtyData = { email, firstname, lastname, birthday, motto };

    const cleanData = {};

    for (const elem in dirtyData) {
      if (dirtyData[elem].trim().length > 0) cleanData[elem] = dirtyData[elem];
    }

    // Object.entries(dirtyData).forEach((element) => {
    //   if (element[1].trim().length > 0) cleanData[element[0]] = element[1];
    // });

    // console.log(cleanData);

    axios
      .put(`${process.env.REACT_APP_API_URL}/user/modify`, cleanData, {
        withCredentials: true,
      })
      .then((res) => setUserData(res.data))
      .catch((err) => setError(err.response.data));

    setEmail("");
    setFirstname("");
    setLastname("");
    setBirthday("");
    setMotto("");
  };

  // -- Axios delete user DELETE --
  const handleDeleteUser = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/user/delete`, {
        withCredentials: true,
      })
      .then(() => navigate("/"))
      .catch((err) => setError(err.response.data));
  };

  // -- JSX --
  return (
    <div>
      <Header />

      <h1>USER PROFIL</h1>

      {error && <p>{error}</p>}

      <button onClick={() => setEditFormState(!editFormState)}>
        Edit my account
      </button>
      <button onClick={handleDeleteUser}>Delete my account</button>

      <h6>Your e-mail: {userData.email}</h6>
      <h6>Your first name: {userData.firstname}</h6>
      <h6>Your last name: {userData.lastname}</h6>
      {userData.birthday && <h6>Your birthday: {userData.birthday}</h6>}
      {userData.motto && <h6>Your motto: {userData.motto}</h6>}

      {editFormState && (
        <form action="" onSubmit={handleEditUser}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
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

          <input type="submit" value="Edit" />
        </form>
      )}

      <hr />
      <Footer />
    </div>
  );
};

export default ProfilPage;
