import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const GetUserData = async (req, res, next) => {
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

    // Generate JWT token
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);

    // Send successful response with the token
    return res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      token,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { GetUserData };
