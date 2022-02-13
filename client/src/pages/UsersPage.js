import React, { useState } from "react";

import AllUsers from "../components/users-components/AllUsers";
import ConvMsgs from "../components/msgs-components/ConvMsgs";
import Footer from "../components/Footer";
import Header from "../components/Header";

const UsersPage = () => {
  // -- useState --
  const [usersState, setUsersState] = useState(true);
  const [msgsState, setMsgsState] = useState(false);
  const [convID, setConvID] = useState("");

  // -- JSX --
  return (
    <div>
      <Header />

      {usersState && (
        <AllUsers
          setConvID={setConvID}
          setUsersState={setUsersState}
          setMsgsState={setMsgsState}
        />
      )}

      {msgsState && (
        <ConvMsgs
          convID={convID}
          setUsersState={setUsersState}
          setMsgsState={setMsgsState}
        />
      )}

      <Footer />
    </div>
  );
};

export default UsersPage;
