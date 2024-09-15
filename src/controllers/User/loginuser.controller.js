import { StatusCodes } from "http-status-codes";
import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { COOKIES_OPTIONS } from "../../constants.js";

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundedUser = await User.findOne({ email });

    if (!foundedUser) {
      // User not found
      return res.status(StatusCodes.NOT_FOUND).send({
        message: "You are not rigstered!",
      });
    }

    // Check if the password matches
    const chkPassword = bcrypt.compareSync(password, foundedUser.password);
    if (!chkPassword) {
      // Password does not match
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: "Please type correct password!",
      });
    }

    const { _id } = foundedUser;

    // Generate JWT Refresh Token
    const refreshToken = jwt.sign(
      { email, _id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    // Generate JWT Access Token
    const accessToken = jwt.sign(
      { email, _id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    // Store refresh token in the database
    foundedUser.refreshToken = refreshToken;
    await foundedUser.save();

    return res
      .status(StatusCodes.OK)
      .cookie("refreshToken", refreshToken, COOKIES_OPTIONS)
      .cookie("accessToken", accessToken, COOKIES_OPTIONS)
      .send({
        message: "You have been signin successfully!",
      });
  } catch (error) {
    console.error("---- Error in Login User ----", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Please try again!",
    });
  }
};

export { LoginUser };
