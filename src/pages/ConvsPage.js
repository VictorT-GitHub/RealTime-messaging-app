import React, { useState } from "react";

import ConvMsgs from "../components/ConvMsgs";
import UserConvs from "../components/UserConvs";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ConvsPage = () => {
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
        />
      )}

      {msgsState && (
        <ConvMsgs
          convID={convID}
          setConvsState={setConvsState}
          setMsgsState={setMsgsState}
        />
      )}

      <Footer />
    </div>
  );
};

export default ConvsPage;
