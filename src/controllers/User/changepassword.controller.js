import { StatusCodes, ReasonPhrases } from "http-status-codes";
import bcrypt from "bcrypt";

const ChangePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.query;
    const { user } = req;

    if (!oldPassword && !newPassword) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: ReasonPhrases.BAD_REQUEST,
      });
    }

    const isOldPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);

    if (!isOldPasswordCorrect) {
      // Old password does not match
      return res.status(StatusCodes.NOT_ACCEPTABLE).send({
        message: ReasonPhrases.NOT_ACCEPTABLE,
      });
    }

    // Check if new password is the same as old password
    if (bcrypt.compareSync(newPassword, user.password)) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).send({
        message: ReasonPhrases.NOT_ACCEPTABLE,
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashPassword;

    const updatedUserWithPassword = await user.save({
      validateBeforeSave: false,
    });

    res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      updatedUserWithPassword,
    });
  } catch (error) {
    console.error("----  Error in Changing User Password ----", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { ChangePassword };
