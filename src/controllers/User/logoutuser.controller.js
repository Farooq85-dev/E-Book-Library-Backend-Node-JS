import { StatusCodes } from "http-status-codes";
import { User } from "../../models/user.model.js";

const LogoutUser = async (req, res) => {
  try {
    const { _id } = req.user;

    // Clear the refreshToken field in the user document
    await User.findByIdAndUpdate(_id, {
      $unset: {
        refreshToken: 1,
      },
    });

    // Clear cookies
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(StatusCodes.OK)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .send({
        message: "You have been logout successfully!",
      });
  } catch (error) {
    console.log("---- Error in Logout User ----", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Please try again!",
    });
  }
};

export { LogoutUser };
