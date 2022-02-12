import express from "express";
const router = express.Router();

import auth_controller from "../controllers/auth.controller.mjs";

// POST REGISTER new user (return user._id)
router.post("/register", auth_controller.postNewUser);

// POST LOGIN (return user._id)
router.post("/login", auth_controller.userLogin);

// GET LOGOUT (redirect to the homepage)
router.get("/logout", auth_controller.userLogout);

export default router;
