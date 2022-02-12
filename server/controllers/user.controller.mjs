import usermodel from "../models/user.model.mjs";
import JOIvalidation from "../validation/validation.mjs";

// GET all users (no lastname, no password) (without current user)
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await usermodel
      .find({ _id: { $ne: res.locals.user_id } })
      .select("-__v -password -lastname -updatedAt");

    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send("Get all users Error: " + error);
  }
};

// GET current user (no password)
const getOneUser = async (req, res) => {
  try {
    const user = await usermodel
      .findById(res.locals.user_id)
      .select("-__v -password");

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Get user Error: " + error);
  }
};

// PUT current user (no password)
const modifyOneUser = async (req, res) => {
  // JOI validation
  const { error } = JOIvalidation.modifyUserCheck(req.body);
  if (error)
    return res
      .status(400)
      .send("Modify user Error: " + error.details[0].message);

  try {
    const user = await usermodel
      .findByIdAndUpdate(
        res.locals.user_id,
        {
          $set: {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthday: req.body.birthday,
            motto: req.body.motto,
          },
        },
        { new: true }
      )
      .select("-__v -password");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("Modify user Error: " + error);
  }
};

// DELETE current user (no password)
const deleteOneUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 }); // "Delete" the jwt cookie

    const user = await usermodel
      .findByIdAndDelete(res.locals.user_id)
      .select("-__v -password");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Delete user Error: " + error);
  }
};

export default { getAllUsers, getOneUser, modifyOneUser, deleteOneUser };
