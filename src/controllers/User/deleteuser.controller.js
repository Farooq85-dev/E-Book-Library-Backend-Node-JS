import { StatusCodes } from "http-status-codes";
import { User } from "../../models/user.model.js";

const DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(StatusCodes.OK).send({
      message: "Your data is deleted!",
      deletedUser,
    });
  } catch (error) {
    console.error("----  Error in Deleting User ----", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Please try again!",
    });
  }
};

export { DeleteUser };
