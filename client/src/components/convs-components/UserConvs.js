import React, { useEffect, useState } from "react";
import axios from "axios";

import Conv from "./Conv";

const UserConvs = ({ setConvID, setConvsState, setMsgsState, pusherData }) => {
  // -- useState --
  const [convsArray, setConvsArray] = useState([]);
  const [userid, setuserid] = useState("");
  const [error, setError] = useState("");

  // -- useEffect --
  // Axios user id GET
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/one`, {
        withCredentials: true,
      })
      .then((res) => setuserid(res.data._id))
      .catch((err) => setError(err.response.data));
  }, []);

  // Axios all conversations GET
  // (fetch normal : ouverture de la page)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/conv/all`, {
        withCredentials: true,
      })
      .then((res) => setConvsArray(res.data))
      .catch((err) => setError(err.response.data));
  }, []);

  // PUSHER Axios one conversation GET
  // (pusher fetch : real time)
  useEffect(() => {
    // fetch only if the current user have acces to the conversation
    // pusherData.docID === id of the modifed conversation
    // pusherData.usersID === ids of the owners of the conversation
    if (
      (pusherData &&
        convsArray.some((conv) => conv._id === pusherData.docID)) ||
      (pusherData.usersID && pusherData.usersID.includes(userid))
    ) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/conv/one/${pusherData.docID}`, {
          withCredentials: true,
        })
        .then((res) => {
          const newConvsArray = convsArray.filter(
            (conv) => conv._id !== res.data._id
          );
          setConvsArray([...newConvsArray, res.data]);
        })
        .catch((err) => setError(err.response.data));
    }
  }, [pusherData]);

  // -- JSX --
  return (
    <div>
      <h1>USER CONVERSATIONS</h1>

      {error && <p>{error}</p>}
      {error && <hr />}

      {convsArray.map((conv) => {
        return (
          <Conv
            key={conv._id}
            userid={userid}
            conv={conv}
            setConvID={setConvID}
            setConvsState={setConvsState}
            setMsgsState={setMsgsState}
          />
        );
      })}
    </div>
  );
};

export default UserConvs;
