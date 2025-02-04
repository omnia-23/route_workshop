import userModel from "../../db/models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { createHtml } from "../../utils/emailTemp.js";
import { sendMail } from "../../utils/sendEmail.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hash = await bcryptjs.hash(password, 10);
  const existUser = await userModel.findOne({
    email,
  });
  if (existUser) {
    res.status(400).json({ message: "email already exist" });
  }
  const user = await userModel.create({ name, email, password: hash });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    "key",
    {
      expiresIn: "15m",
    }
  );
  const html = createHtml(token);
  const responseEmail = await sendMail(user.email, html);
  if (!responseEmail) res.status(500).json({ message: "Failed to send email" });
  return res.status(200).json({
    message: "user created successfully",
    token,
  });
};

export const confirmEmail = async (req, res, next) => {
  const { token } = req.headers;
  console.log({ token });
  const payload = jwt.verify(token, "key");
  const user = await userModel.findById(payload.id);
  if (!user) return res.status(400).json({ message: "user not found" });
  user.confirmEmail = true;
  await user.save();
  console.log({ payload });
  return res.status(200).json({ message: "email confirmed successfully" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, confirmEmail: true });
  if (!user) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  const isValidPassword = await bcryptjs.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  const token = jwt.sign({ id: user._id }, "key");
  return res.status(200).json({ message: "login successfully", token });
};
