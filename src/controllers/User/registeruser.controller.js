import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { User } from "../../models/user.model.js";
import { userSchemaValidation } from "../../validationschemas/validation.js";
import bcrypt from "bcrypt";

const RegisterUser = async (req, res) => {
  try {
    const { error } = userSchemaValidation.validate(req.body);
    const hashPassword = await bcrypt.hashSync(req.body.password, 10);
    const createdUser = await User.create({
      ...req.body,
      password: hashPassword,
    });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    console.log("---- createdUser ----", createdUser);

    res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      createdUser,
    });
  } catch (error) {
    console.log("---- Error in Registering User ----", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { RegisterUser };
