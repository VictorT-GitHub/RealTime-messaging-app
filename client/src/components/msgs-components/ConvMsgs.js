import React, { useEffect, useState } from "react";
import axios from "axios";

import Msg from "./Msg";
import AddMsg from "./AddMsg";

const ConvMsgs = ({
  convID,
  setConvsState,
  setUsersState,
  setMsgsState,
  pusherData,
}) => {
  // BACK BTN
  const handleBackBtn = () => {
    setMsgsState(false);
    setConvsState ? setConvsState(true) : setUsersState(true);
  };

  // -- useState --
  const [msgsArray, setMsgsArray] = useState([]);
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

  // Axios all conv-msgs GET
  // (fetch normal : ouverture de la page)
  useEffect(() => {
    if (convID !== "") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/conv/one/${convID}`, {
          withCredentials: true,
        })
        .then((res) => setMsgsArray(res.data.messages))
        .catch((err) => setError(err.response.data));
    }
  }, [convID]);

  // PUSHER Axios all conv-msgs GET
  // (pusher fetch : real time)
  useEffect(() => {
    // fetch only if the current user have acces to the modifed conversation
    // pusherData.documentKey._id === id of the modifed conversation
    if (pusherData && pusherData.documentKey._id === convID) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/conv/one/${convID}`, {
          withCredentials: true,
        })
        .then((res) => setMsgsArray(res.data.messages))
        .catch((err) => setError(err.response.data));
    }
  }, [pusherData]);

  // -- JSX --
  return (
    <div>
      <button onClick={handleBackBtn}>
        Back to {setConvsState ? "conversations" : "users list"}
      </button>

      <h1>CONV MSGS</h1>

      {error && <p>{error}</p>}

      {msgsArray.map((msg) => {
        return (
          <Msg key={msg._id} msg={msg} userid={userid} convID={convID}></Msg>
        );
      })}

      <AddMsg convID={convID}></AddMsg>

      <hr />
    </div>
  );
};

export default ConvMsgs;
