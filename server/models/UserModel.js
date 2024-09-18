import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already registered"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: false,
  },
  color: {
    type: Number,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    required: false,
  },
});
userSchema.pre("save", async function (next) {
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});
const UserModel = mongoose.model("user", userSchema);
export default UserModel;
