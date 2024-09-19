import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { server, io } from "./app.js";
dotenv.config({ path: "./.env" });

// Connecting To Database
connectDB();

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("---- A User Connected ----");

  // Handle socket events here
  socket.on("disconnect", () => {
    console.log("---- A User Disconnected ----");
  });
});

// Listening App
server.listen(process.env.PORT || 3000, () => {
  console.log(`---- Server is running at PORT:- ${process.env.PORT} ----`);
});
