import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/index.js";
import { createServer } from "http";
import { Server } from "socket.io";

// Creating Express App
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Using Cors To Allow Request From Any Origin
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Using Express JSON To Parse Data
app.use(express.json({ limit: "15kb" }));

// Using Cookie Parser To Parse Cookies
app.use(cookieParser());

// Using Express URL-Encoded Middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Creating Main Route For All Requests
app.use("/api/v1/", router);

// Exporting Server and IO
export { server, io };
