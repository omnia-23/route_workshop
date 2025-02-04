import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: { type: String },
  password: String,
  confirmEmail: { type: Boolean, default: false },
});

const userModel = model("User", userSchema);

export default userModel;
