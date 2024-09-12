import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { User } from "../../models/user.model.js";

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id);
    res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      updatedUser,
    });
  } catch (error) {
    console.log("Error in Updating User ----", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { UpdateUser };
