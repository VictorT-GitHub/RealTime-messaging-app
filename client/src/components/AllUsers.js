import React, { useEffect, useState } from "react";
import axios from "axios";

import User from "./User";

const AllUsers = ({ setConvID, setUsersState, setMsgsState }) => {
  // -- useState --
  const [usersArray, setUsersArray] = useState([]);
  const [error, setError] = useState("");

  // -- useEffect --
  // Axios all users GET
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/all`, {
        withCredentials: true,
      })
      .then((res) => setUsersArray(res.data))
      .catch((err) => setError(err.response.data));
  }, []);

  // -- JSX --
  return (
    <div>
      <h1>ALL-USERS</h1>

      {error && <p>{error}</p>}
      {error && <hr />}

      {usersArray.map((user) => {
        return (
          <User
            key={user._id}
            user={user}
            setConvID={setConvID}
            setUsersState={setUsersState}
            setMsgsState={setMsgsState}
          />
        );
      })}
    </div>
  );
};

export default AllUsers;
