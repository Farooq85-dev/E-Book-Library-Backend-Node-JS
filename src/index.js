import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// Dotenv Configs
dotenv.config({
  path: "./.env",
});

// Connecting To Database
connectDB();

// Listening App
app.listen(process.env.PORT || 3000, () => {
  console.log(`---- Server is running at PORT:- ${process.env.PORT} ----`);
});
