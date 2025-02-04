import connectDB from "./db/connection.js";
import authController from "./modules/auth/auth.controller.js";

const bootstrap = (app, express) => {
  app.use(express.json());
  connectDB();
  app.use("/auth", authController);
  app.use("/*", (req, res) => {
    return res.status(400).json({ message: "invalid routing!" });
  });
};
export default bootstrap;
