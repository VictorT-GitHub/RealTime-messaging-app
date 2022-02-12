import React, { useEffect, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js";

import Msg from "./Msg";
import AddMsg from "./AddMsg";

const ConvMsgs = ({ convID, setConvsState, setUsersState, setMsgsState }) => {
  // BACK BTN
  const handleBackBtn = () => {
    setMsgsState(false);
    setConvsState ? setConvsState(true) : setUsersState(true);
  };

  // -- useState --
  const [msgsArray, setMsgsArray] = useState([]);
  const [userid, setuserid] = useState("");
  const [pusherData, setPusherData] = useState("");
  const [error, setError] = useState("");

  // -- useEffect --
  // Axios all conv-msgs GET
  useEffect(() => {
    if (convID !== "") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/conv/one/${convID}`, {
          withCredentials: true,
        })
        .then((res) => setMsgsArray(res.data.messages))
        .catch((err) => setError(err.response.data));
    }
  }, [convID, pusherData]);

  // Axios user id GET
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/one`, {
        withCredentials: true,
      })
      .then((res) => setuserid(res.data._id))
      .catch((err) => setError(err.response.data));
  }, []);

  // -- PUSHER msgs --
  useEffect(() => {
    const pusher = new Pusher("286aedadfa63e4354460", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("msgs");

    channel.bind("updated", (data) => {
      setPusherData(data);
    });
  }, []);

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
