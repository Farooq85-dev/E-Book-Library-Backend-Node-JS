import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Dotenv Configs
dotenv.config({
  path: "./.env",
});

const LogoutUser = async (req, res) => {
  try {
    // Extract the token from cookies or authorization header
    const token =
      req.cookies.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: ReasonPhrases.UNAUTHORIZED,
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
        message: ReasonPhrases.NOT_FOUND,
      });
    }

    // Clear the refreshToken field in the user document
    await User.findByIdAndUpdate(_id, {
      $unset: {
        refreshToken: 1,
      },
    });

    // Clear cookies
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };

    res
      .status(StatusCodes.OK)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .send({
        message: ReasonPhrases.OK,
      });
  } catch (error) {
    console.error("Logout error:", error); // Log the error for debugging
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { LogoutUser };
