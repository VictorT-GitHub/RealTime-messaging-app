import React, { useState } from "react";

import UserConvs from "../components/convs-components/UserConvs";
import ConvMsgs from "../components/msgs-components/ConvMsgs";
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
