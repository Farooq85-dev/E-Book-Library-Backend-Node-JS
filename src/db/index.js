import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

import dotenv from "dotenv";

// Dotenv Configs
dotenv.config({
  path: "./.env",
});

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("---- MONGODB connected SUCCESSFULLY ----");
  } catch (error) {
    console.log("---- MONGODB connection FAILED ----", error);
    process.exit(1);
  }
};

export default connectDB;
