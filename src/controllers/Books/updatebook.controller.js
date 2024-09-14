import { StatusCodes } from "http-status-codes";
import { Book } from "../../models/book.model.js";

const UpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    return res.status(StatusCodes.OK).send({
      message: "Book updated successfully!",
      updatedBook,
    });
  } catch (error) {
    console.error("----  Error in Updating Book ----", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Please try again!",
    });
  }
};

export { UpdateBook };
