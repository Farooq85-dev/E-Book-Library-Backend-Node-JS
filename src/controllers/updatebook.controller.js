import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Book } from "./../models/book.model.js";

const UpdateBookData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      updatedBook,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { UpdateBookData };
