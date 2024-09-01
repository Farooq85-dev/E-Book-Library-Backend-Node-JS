import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Book } from "../models/book.model.js";

const GetBookData = async (req, res, next) => {
  try {
    const foundedBook = await Book.find();

    if (!foundedBook) {
      // User not found
      return res.status(StatusCodes.NOT_FOUND).send({
        message: ReasonPhrases.NOT_FOUND,
      });
    }

    // Send successful response with the token
    return res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      foundedBook,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { GetBookData };
