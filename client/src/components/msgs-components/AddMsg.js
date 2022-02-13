import axios from "axios";
import React, { useState } from "react";

const AddMsg = ({ convID }) => {
  // -- useState --
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // -- Axios add-msg Form PUT --
  const handleAddMsg = (e) => {
    e.preventDefault();
    setError("");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/conv/add-msg/${convID}`,
        { text },
        { withCredentials: true }
      )
      .then(() => setText(""))
      .catch((err) => setError(err.response.data));
  };

  // -- JSX --
  return (
    <div>
      <form action="" onSubmit={handleAddMsg}>
        {error && <div>{error}</div>}

        <textarea
          onChange={(e) => setText(e.target.value)}
          cols="50"
          rows="1"
          placeholder="Whrite your message here..."
          value={text}
        ></textarea>

        <input type="submit" value="Send Msg" />
      </form>
    </div>
  );
};

export default AddMsg;
