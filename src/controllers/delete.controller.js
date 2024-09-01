import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { User } from "./../models/user.model.js";

const DelData = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      deletedUser,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { DelData };
