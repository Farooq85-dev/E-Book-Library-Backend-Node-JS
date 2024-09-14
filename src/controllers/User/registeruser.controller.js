import { StatusCodes } from "http-status-codes";
import { User } from "../../models/user.model.js";
import { userSchemaValidation } from "../../joivalidationschemas/validation.js";
import bcrypt from "bcrypt";

const RegisterUser = async (req, res) => {
  try {
    const { error, email } = userSchemaValidation.validate(req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hashSync(req.body.password, 10);
    const createdUser = await User.create({
      ...req.body,
      password: hashPassword,
    });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    return res.status(StatusCodes.OK).send({
      message: "You have been registered Successfully!",
      createdUser,
    });
  } catch (error) {
    console.log("---- Error in Registering User ----", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Please try again!",
    });
  }
};

export { RegisterUser };
