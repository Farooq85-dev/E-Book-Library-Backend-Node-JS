import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/index.js";

// Creating Express App
const app = express();

// Using Cors To Allow Request From Any Origin
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies and other credentials
  })
);

// Using Express JSON To Parse Data
app.use(express.json({ limit: "15kb" }));

// Using Cookie Parser To Parse Data
app.use(cookieParser());

// Using Cookie Parser To Parse Cookies
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//Creating Main Route For All Request
app.use("/api/v1/", router);

// Exporting App
export { app };
