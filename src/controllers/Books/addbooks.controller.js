import { StatusCodes } from "http-status-codes";
import { booksSchemaValidation } from "../../joivalidationschemas/validation.js";
import { Book } from "../../models/book.model.js";

const PostBook = async (req, res) => {
  try {
    const { error } = booksSchemaValidation.validate(req.body, {
      new: true,
    });

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

    return res.status(StatusCodes.OK).send({
      message: "Book added successfully!",
      book: createdBook,
    });
  } catch (error) {
    console.log("---- Error in Adding Book ----", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Please try again!",
    });
  }
};

export { PostBook };
