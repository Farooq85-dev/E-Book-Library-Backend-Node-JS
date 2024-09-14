import { StatusCodes } from "http-status-codes";
import { User } from "../../models/user.model.js";

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id);
    return res.status(StatusCodes.OK).send({
      message: "You profile is updated sucessfully!",
      updatedUser,
    });
  } catch (error) {
    console.log("Error in Updating User ----", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Please tr again!",
    });
  }
};

export { UpdateUser };
