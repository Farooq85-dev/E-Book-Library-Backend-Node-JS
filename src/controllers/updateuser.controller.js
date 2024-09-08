import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { User } from "../models/user.model.js";

const UpdateUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, {
      password: "updatedPassword",
    });
    res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      updatedUser,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { UpdateUserData };
