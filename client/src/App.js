import "./App.css";
import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";

import Router from "./components/Router";

const App = () => {
  // -- useState --
  // Trigger some axios useEffect on UserConvs.js and ConvMsgs.js
  const [pusherData, setPusherData] = useState("");

  // -- PUSHER convs & msgs --
  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: process.env.PUSHER_CLUSTER,
    });

    // conversations (add)
    const channel = pusher.subscribe("convs");
    channel.bind("inserted", (data) => {
      setPusherData(data);
    });

    // messages (add-modify-delete)
    const channelMsg = pusher.subscribe("msgs");
    channelMsg.bind("updated", (data) => {
      setPusherData(data);
    });
  }, []);

  // -- JSX Router--
  return (
    <div>
      <Router pusherData={pusherData} />
    </div>
  );
};

export default App;
