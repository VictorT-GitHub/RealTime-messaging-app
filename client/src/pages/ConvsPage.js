import React, { useState } from "react";

import UserConvs from "../components/convs-components/UserConvs";
import ConvMsgs from "../components/msgs-components/ConvMsgs";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ConvsPage = ({ pusherData }) => {
  // -- useState --
  const [convsState, setConvsState] = useState(true);
  const [msgsState, setMsgsState] = useState(false);
  const [convID, setConvID] = useState("");

  // -- JSX --
  return (
    <div>
      <Header />

      {convsState && (
        <UserConvs
          setConvID={setConvID}
          setConvsState={setConvsState}
          setMsgsState={setMsgsState}
          pusherData={pusherData}
        />
      )}

      {msgsState && (
        <ConvMsgs
          convID={convID}
          setConvsState={setConvsState}
          setMsgsState={setMsgsState}
          pusherData={pusherData}
        />
      )}

      <Footer />
    </div>
  );
};

export default ConvsPage;
