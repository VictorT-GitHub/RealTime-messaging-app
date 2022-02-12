import React, { useEffect, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js";

import Conv from "./Conv";

const UserConvs = ({ setConvID, setConvsState, setMsgsState }) => {
  // -- useState --
  const [convsArray, setConvsArray] = useState([]);
  const [userid, setuserid] = useState("");
  const [pusherData, setPusherData] = useState("");
  const [error, setError] = useState("");

  // -- useEffect --
  // Axios current-user-id GET
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/one`, {
        withCredentials: true,
      })
      .then((res) => setuserid(res.data._id))
      .catch((err) => setError(err.response.data));
  }, []);

  // Axios all user-convs GET
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/conv/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setConvsArray(res.data);
        console.log(res.data);
      })
      .catch((err) => setError(err.response.data));
  }, [pusherData]);

  // -- PUSHER convs --
  useEffect(() => {
    const pusher = new Pusher("286aedadfa63e4354460", {
      cluster: "eu",
    });

    // new conv
    const channel = pusher.subscribe("convs");
    channel.bind("inserted", (data) => {
      setPusherData(data);
      console.log(data);
    });

    // new last message
    const channelMsg = pusher.subscribe("msgs");
    channelMsg.bind("updated", (data) => {
      setPusherData(data);
    });
  }, []);

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
