import React, { useState } from "react";
import axios from "axios";

const Msg = ({ msg, userid, convID }) => {
  // -- Data manipulation --
  const msgDate = new Date(msg.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // -- useState --
  const [text, settext] = useState("");
  const [error, setError] = useState("");
  const [editFormState, setEditFormState] = useState(false);

  // -- Axios modify-msg Form PUT --
  const handleEditMsg = (e) => {
    e.preventDefault();
    setError("");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/conv/modify-msg/${convID}/${msg._id}`,
        { text },
        { withCredentials: true }
      )
      .then(() => settext(""))
      .catch((err) => setError(err.response.data));

    setEditFormState(false);
  };

  // -- Axios delete-msg PUT --
  const handleDeleteMsg = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/conv/delete-msg/${convID}/${msg._id}`,
        {},
        { withCredentials: true }
      )
      .catch((err) => setError(err.response.data));
  };

  // -- JSX --
  return (
    <div>
      {/* Need msg.authorID condition in case this author has been deleted */}
      {msg.authorID ? (
        <div>
          {msg.authorID._id === userid ? "Me :" : `${msg.authorID.firstname} :`}
        </div>
      ) : (
        "-deleted_account-"
      )}

      {/* Message date & message text */}
      <div>
        [{msgDate}] {msg.text}
      </div>

      {/* Need msg.authorID condition in case this author has been deleted */}
      {/* User can only modify & delete their own msgs */}
      {msg.authorID && msg.authorID._id === userid && (
        <div>
          <button onClick={() => setEditFormState(!editFormState)}>
            Edit your msg
          </button>

          <button onClick={handleDeleteMsg}>Delete your msg</button>
        </div>
      )}

      {/* Errors display */}
      {error && <div>{error}</div>}

      {/* Modify message form */}
      {editFormState && (
        <form action="" onSubmit={handleEditMsg}>
          <textarea
            onChange={(e) => settext(e.target.value)}
            cols="50"
            rows="1"
            placeholder="Modify your new message here..."
            value={text}
          ></textarea>

          <input type="submit" value="Edit Msg" />
        </form>
      )}

      <hr />
    </div>
  );
};

export default Msg;
