import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { booksSchemaValidation } from "../validationschemas/validation.js";
import { Book } from "../models/book.model.js";

const PostBookData = async (req, res) => {
  try {
    const { error } = booksSchemaValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { bookImage, ...bookDetails } = req.body;

    // Add book data with image URL
    const createdBook = await Book.create({
      ...bookDetails,
      bookImage,
    });

    console.log("---- Book Added Successfully ----", createdBook);

    res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      book: createdBook,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { PostBookData };
