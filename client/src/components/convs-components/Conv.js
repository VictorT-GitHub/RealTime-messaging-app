import React from "react";

const Conv = ({ conv, userid, setConvID, setMsgsState, setConvsState }) => {
  const lastMsg = conv.messages[conv.messages.length - 1];
  const friendData = conv.usersID.find((user) => user._id !== userid);

  // HandleOnClick - ConvDiv
  const handleOnClick = () => {
    setConvID(conv._id);
    setMsgsState(true);
    setConvsState(false);
  };

  // -- JSX --
  return (
    <div onClick={handleOnClick}>
      {/* Need a condition in case friend user has been deleted */}
      <div>{friendData ? friendData.firstname : "-deleted_account-"}</div>

      {conv.messages.length > 0 && (
        <div>
          [
          {new Date(lastMsg.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
          ] {lastMsg.text}
        </div>
      )}

      <hr />
    </div>
  );
};

export default Conv;
