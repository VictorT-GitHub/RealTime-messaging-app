import Pusher from "pusher";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import cookieParser from "cookie-parser";

import auth_router from "./routes/auth.router.mjs";
import user_router from "./routes/user.router.mjs";
import conv_router from "./routes/conv.router.mjs";
import checkAuthToken from "./middlewares/auth.middlewares.mjs";

// -- App config --
const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("trust proxy", 1);

// -- Connection to MongoDB Atlas --
mongoose.connect(process.env.DB_URI, (err) => {
  if (err) console.log("MongoDB connection Error: " + err);
  else console.log("Connected to MongoDB");
});

// -- PUSHER --
// Config
const pusher = new Pusher({
  appId: "1340246",
  key: "286aedadfa63e4354460",
  secret: "52e2f6e509c61efa616c",
  cluster: "eu",
  useTLS: true,
});

// Wait mongoDB connection
mongoose.connection.once("open", () => {
  // Change-Stream on "conversations" collection
  const convCollection = mongoose.connection.collection("conversations");
  const changeStream = convCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    // (Put) Add/edit/delete message
    if (change.operationType === "update") {
      pusher.trigger("msgs", "updated", change.clusterTime);
    }

    // Post new conversation
    if (change.operationType === "insert") {
      pusher.trigger("convs", "inserted", change.clusterTime);
    }
  });
});

// -- Routes --
// API Home-page
app.get("/api", (req, res) => res.send("Welcome on the StarTup API !"));

// Middlewares to Controller Routers
// + authentication middleware
app.use("/api/auth", auth_router);
app.use("/api/user", checkAuthToken, user_router);
app.use("/api/conv", checkAuthToken, conv_router);

// 404 Middleware
app.use("/", (req, res) => res.status(404).send("Error404: page not found"));

// -- Server --
app.listen(PORT, () => console.log(`Heroku server started on port : ${PORT}`));
//`Server started: http://localhost:${PORT}/`
