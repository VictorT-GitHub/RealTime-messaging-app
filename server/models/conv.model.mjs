import mongoose from "mongoose";

// MONGOOSE SCHEMA
const convschema = new mongoose.Schema(
  {
    usersID: {
      type: [mongoose.Types.ObjectId],
      ref: "users",
    },
    messages: [
      {
        authorID: {
          type: mongoose.Types.ObjectId,
          ref: "users",
        },
        text: {
          type: String,
          max: 2000,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// export MONGOOSE MODEL
export default mongoose.model("conversations", convschema);
