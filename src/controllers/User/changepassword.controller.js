import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

const ChangePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    console.log(req.body);

    const { user } = req;

    if (!oldPassword || !newPassword) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "Old password or new password is missing!",
      });
    }

    // Verify old password
    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.password
    ); // Use async version

    if (!isOldPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: "Incorrect old password!",
      });
    }

    // Check if new password is the same as old password
    const isNewPasswordSameAsOld = await bcrypt.compare(
      newPassword,
      user.password
    ); // Use async version

    if (isNewPasswordSameAsOld) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "New password must be different from the old password!",
      });
    }

    // Hash the new password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    user.password = hashPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(StatusCodes.OK).send({
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.error("---- Error in Changing User Password ----", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "An error occurred. Please try again!",
    });
  }
};

export { ChangePassword };
