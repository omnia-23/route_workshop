import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect("mongodb://localhost:27017/workshop10test")
    .then((result) => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(`failed to connect to DB..... err`);
    });
};

export default connectDB;
