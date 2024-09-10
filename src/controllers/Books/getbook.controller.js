import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Book } from "../../models/book.model.js";

const GetBook = async (req, res) => {
  try {
    // Get the page number from the query parameters, default to 1 if not provided
    const page = parseInt(req.query.page) || 1;

    // Define the number of books per page
    const limit = 3;

    // Calculate the number of books to skip based on the current page
    const skip = (page - 1) * limit;

    // Find books with pagination
    const foundedBook = await Book.find().skip(skip).limit(limit);

    // Count the total number of books to calculate total pages
    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    if (!foundedBook.length) {
      return res.status(StatusCodes.NOT_FOUND).send({
        message: ReasonPhrases.NOT_FOUND,
      });
    }

    return res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      foundedBook,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { GetBook };
