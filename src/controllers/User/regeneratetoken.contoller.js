import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { COOKIES_OPTIONS } from "../../constants.js";

console.log(process.env.ACCESS_TOKEN_EXPIRY);

const RefreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: "Refresh token is missing. Please sign in again.",
      });
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const { email, _id } = decoded;

    // Generate new tokens
    const newAccessToken = jwt.sign(
      { email, _id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const newRefreshToken = jwt.sign(
      { email, _id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    // Set cookies with new tokens
    res.cookie("accessToken", newAccessToken, COOKIES_OPTIONS);
    res.cookie("refreshToken", newRefreshToken, COOKIES_OPTIONS);

    return res.status(StatusCodes.OK).send({
      message: "Tokens refreshed successfully!",
    });
  } catch (error) {
    console.log("---- Error in Token Refresh ----", error);
    return res.status(StatusCodes.UNAUTHORIZED).send({
      message: "Invalid refresh token. Please sign in again.",
    });
  }
};

export { RefreshToken };
