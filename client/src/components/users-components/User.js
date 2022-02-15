import axios from "axios";
import React, { useEffect, useState } from "react";

const User = ({ user, setConvID, setUsersState, setMsgsState }) => {
  // -- useState --
  const [userID, setUserID] = useState("");

  // -- useEffect --
  // Axios new conversation POST
  useEffect(() => {
    if (userID !== "") {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/conv/add`,
          { userID },
          { withCredentials: true }
        )
        // Open the new conversation after creation
        .then((res) => {
          setConvID(res.data._id);
          setMsgsState(true);
          setUsersState(false);
        })
        // If conversations already exist, open this conversation
        .catch((err) => {
          // console.log(err.response.data);
          setConvID(err.response.data.slice(-24));
          setMsgsState(true);
          setUsersState(false);
        });
    }
  }, [userID]);

  // -- JSX --
  return (
    <div onClick={() => setUserID(user._id)}>
      <div>{user.firstname}</div>

      <div>{user.email}</div>

      {user.birthday && (
        <div>{new Date(user.birthday).toLocaleDateString()}</div>
      )}

      {user.motto && <div>{user.motto}</div>}

      <hr />
    </div>
  );
};

export default User;
