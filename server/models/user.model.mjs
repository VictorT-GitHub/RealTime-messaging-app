import mongoose from "mongoose";
import bcrypt from "bcrypt";

// MONGOOSE SCHEMA
const userschema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    birthday: Date,
    motto: String,
  },
  { timestamps: true }
);

// PASSWORD BCRYPT - PRE HOOK (Middleware)
userschema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// LOGIN CHECK - STATICS FUNCTION
userschema.statics.login = async function (email, password) {
  // query mongodb for find a user with this email
  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect email");

  // bcrypt check if passwords are corresponding
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) throw Error("Incorrect password");

  // if everything ok, funct return the user id
  return user._id;
};

// export MONGOOSE MODEL
export default mongoose.model("users", userschema);
