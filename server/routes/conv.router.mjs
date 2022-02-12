import express from "express";
const router = express.Router();

import conv_controller from "../controllers/conv.controller.mjs";

// ------ CRUD CONVERSATION ------
// POST new conversation
router.post("/add", conv_controller.postNewConv);

// DELETE new conversation  !! WORK IN PROGRESS !!
router.delete("/delete/:id", conv_controller.deleteNewConv);

// GET all conversations from current user
router.get("/all", conv_controller.getAllConvsFromUser);

// GET one conversation from current user
router.get("/one/:id", conv_controller.getOneConvFromUser);

// ------ CRUD MESSAGE ------
// GET one msg (from one conversation from current user)
router.get("/one-msg/:conv_id/:msg_id", conv_controller.getOneMsg);

// PUT add msg (to one conversation from current user)
router.put("/add-msg/:id", conv_controller.addOneMsg);

// PUT modify one msg (from conversation from current user)
router.put("/modify-msg/:conv_id/:msg_id", conv_controller.modifyOneMsg);

// PUT delete one msg (from conversation from current user)
router.put("/delete-msg/:conv_id/:msg_id", conv_controller.deleteOneMsg);

export default router;
