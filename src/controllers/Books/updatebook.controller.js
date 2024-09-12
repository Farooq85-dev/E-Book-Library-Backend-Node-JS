import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Book } from "../../models/book.model.js";

const UpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    return res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      updatedBook,
    });
  } catch (error) {
    console.error("----  Error in Updating Book ----", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { UpdateBook };
