import jsonwebtoken from "jsonwebtoken";

import usermodel from "../models/user.model.mjs";
import JOIvalidation from "../validation/validation.mjs";

const maxAge = 24 * 60 * 60;

// POST REGISTER new user (return user._id)
const postNewUser = (req, res) => {
  // JOI validator
  const { error } = JOIvalidation.userCheck(req.body);
  if (error)
    return res.status(400).send("Register Error: " + error.details[0].message);

  const newUser = new usermodel(req.body);

  newUser.save((err, docs) => {
    if (err) res.status(400).send("Register Error: " + err);
    else res.status(201).json({ user_id: docs._id });
  });
};

// POST LOGIN (return user._id)
const userLogin = async (req, res) => {
  // JOI validator
  const { error } = JOIvalidation.loginCheck(req.body);
  if (error)
    return res.status(400).send("Login Error: " + error.details[0].message);

  try {
    // Email&password verification (login() : statics function created in users.model.mjs)
    const user_id = await usermodel.login(req.body.email, req.body.password);

    // JWT create token
    const token = jsonwebtoken.sign({ user_id }, process.env.JWT_KEY, {
      expiresIn: maxAge,
    });

    // Cookies (with cookie-parser)
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: maxAge * 1000,
    });

    // If everything ok, funct return the user id
    res.status(200).json({ user_id: user_id });

    // If error, funct return the error
  } catch (err) {
    res.status(400).send("Login Error: " + err);
  }
};

// GET LOGOUT (redirect to the homepage)
const userLogout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }); // "Delete" the jwt cookie
  res.status(200).send("You have been successfully logged out, goodbye !");
};

export default { postNewUser, userLogin, userLogout };
