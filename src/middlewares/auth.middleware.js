import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";

// Dotenv Configs
dotenv.config({
  path: "./.env",
});

const VerifyUser = async (req, res, next) => {
  try {
    // Extract the token from cookies or authorization header
    const token =
      req.cookies.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: "Please signin again!",
      });
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Extract user ID from the decoded token
    const { _id } = decodedToken;

    // Find the user by ID
    const user = await User.findById(_id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send({
        message: "Please register. If you are register. Please signin again!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("---- Error in User Authentication ----", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Please try again!",
    });
  }
};

export { VerifyUser };
