import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { booksSchemaValidation } from "../validationschemas/validation.js";
import { Book } from "../models/book.model.js";

const PostBookData = async (req, res, next) => {
  try {
    const { error } = booksSchemaValidation.validate(req.body);

    const createdBook = await Book.create(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    console.log("---- Book Added Successfully ----", createdBook);

    res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { PostBookData };
