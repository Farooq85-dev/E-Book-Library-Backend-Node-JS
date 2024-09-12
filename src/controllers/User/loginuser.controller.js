import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Dotenv Configs
dotenv.config({
  path: "./.env",
});

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.query;
    const foundedUser = await User.findOne({ email });

    if (!foundedUser) {
      // User not found
      return res.status(StatusCodes.NOT_FOUND).send({
        message: ReasonPhrases.NOT_FOUND,
      });
    }

    // Check if the password matches
    const chkPassword = bcrypt.compareSync(password, foundedUser.password);
    if (!chkPassword) {
      // Password does not match
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: ReasonPhrases.UNAUTHORIZED,
      });
    }

    const { _id } = foundedUser;
    // Generate JWT Refresh Token
    const refreshToken = jwt.sign(
      { email, _id, password },
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

    //Cookie Options
    const options = {
      httpOnly: true,
      secure: true,
    };

    // Send successful response with the token
    return res
      .status(StatusCodes.OK)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .send({
        message: ReasonPhrases.OK,
        refreshToken,
        accessToken,
      });
  } catch (error) {
    console.error("----  Error in Login User ----", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { LoginUser };
