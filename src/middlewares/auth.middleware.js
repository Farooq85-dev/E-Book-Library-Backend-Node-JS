import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const VerifyUser = async (req, res, next) => {
  try {
    // Extract the token from cookies or authorization header
    const token =
      req.cookies.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: "Access token is missing. Please sign in again!",
      });
    }

    // Verify the JWT token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message:
            "Access token has expired. Please refresh your token or sign in again!",
        });
      }
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: "Invalid access token. Please sign in again!",
      });
    }

    // Extract user ID from the decoded token
    const { _id } = decodedToken;

    // Find the user by ID
    const user = await User.findById(_id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send({
        message: "User not found. Please register or sign in again!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("---- Error in User Authentication ----", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "An internal server error occurred. Please try again!",
    });
  }
};

export { VerifyUser };
